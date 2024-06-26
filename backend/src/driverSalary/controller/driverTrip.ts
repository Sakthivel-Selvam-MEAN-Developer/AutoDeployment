import { Request, Response } from 'express'
import axios from 'axios'
import { IncomingHttpHeaders } from 'http'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { JsonValue } from '@prisma/client/runtime/library'
import {
    create,
    getAllDriverTripById,
    getDriverAdvance,
    getDriverIdByTripId,
    getDriverTripByOverallId,
    getExpensesByTripIds
} from '../models/driverTrip.ts'
import { getAllExpenseCountByTripId } from '../models/expenses.ts'
import { getTripSalaryDetailsById } from '../models/tripSalary.ts'
import { createDriverAdvance } from '../models/driverAdvance.ts'
import { tripBettaCalculation } from '../domain/tripBettaCalculation.ts'

dayjs.extend(utc)

export const createDriverTrip = async (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
type RequestQuery = {
    driverId: string
    month: string
}
type listAllDriverTripByIdType = (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => void
export interface allTripProps {
    id: number
    driver: {
        name: string
        driverAttendance: {
            attendance: JsonValue[]
        }[]
    }
    tripId: number
    unloadingTripSalaryId: number | null
    stockTripSalaryId: number | null
    driverAdvanceForTrip: { amount: number }[]
    primaryTripBetta: number | null
    secondaryTripBetta: number | null
    dailyBetta: number | null
}
type props = (
    tripAdvanceDetails: allTripProps | undefined,
    data: allTripProps
) => { totalTripBetta: number; totalAdvance: number | undefined }
const calculatetripBetta = (data: allTripProps) =>
    (data.primaryTripBetta ? data.primaryTripBetta : 0) +
    (data.secondaryTripBetta ? data.secondaryTripBetta : 0)
const getTotalTripSalary: props = (tripAdvanceDetails, data) => {
    let totalAdvance = 0
    tripAdvanceDetails?.driverAdvanceForTrip.map(({ amount }) => {
        totalAdvance += amount
        return 0
    })
    const totalTripBetta = calculatetripBetta(data)
    return { totalTripBetta, totalAdvance }
}
const getOverallTrip = async (
    headers: IncomingHttpHeaders,
    allTrips: allTripProps[],
    date: string
) => {
    const overAllTripIds: number[] = []
    const totalTripBetta = await tripBettaCalculation(allTrips[0], parseInt(date))
    const driverName = allTrips[0].driver.name
    allTrips.forEach((tripId) => overAllTripIds.push(tripId.tripId))
    const allTripsById = await axios.get(`${headers.hostname}/api/overalltrip/ids`, {
        params: { ids: JSON.stringify(overAllTripIds), month: date }
    })
    const expensesDetails = await getAllExpenseCountByTripId(overAllTripIds)
    const advanceDetails = allTripsById.data.map((trip: { id: number }) => {
        const advanceforTrip = allTrips.filter((tripAdvance) => tripAdvance.tripId === trip.id)
        return { advanceforTrip: advanceforTrip[0].driverAdvanceForTrip }
    })
    const combinedData = allTripsById.data.map((trip: { id: number }) => {
        const expenses = expensesDetails.filter((expense) => expense.tripId === trip.id)
        const advance = allTrips.filter((tripAdvance) => tripAdvance.tripId === trip.id)
        const tripSalary = allTrips.filter((salary) => salary.tripId === trip.id)
        const tripAdvanceDetails = allTrips.find((tripAdvance) => tripAdvance.tripId === trip.id)
        const totalTripSalary = tripSalary.map((data) =>
            getTotalTripSalary(tripAdvanceDetails, data)
        )
        return {
            ...trip,
            tripSalaryDetails: {
                totalTripBetta: totalTripSalary && totalTripSalary[0].totalTripBetta,
                totalAdvance: totalTripSalary && totalTripSalary[0].totalAdvance,
                dailyBetta: tripSalary[0].dailyBetta,
                totalTripSalary:
                    totalTripSalary &&
                    totalTripSalary[0].totalTripBetta - (totalTripSalary[0].totalAdvance || 0)
            },
            expenses,
            advanceforTrip: advance[0].driverAdvanceForTrip
        }
    })
    return { driverName, trips: combinedData, expensesDetails, advanceDetails, totalTripBetta }
}
export const listAllDriverTripById: listAllDriverTripByIdType = async (req, res) => {
    const { driverId, month } = req.query
    await getAllDriverTripById(parseInt(driverId), month)
        .then(async (allTrips) => getOverallTrip(req.headers, allTrips, month))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
const creatData = (advance: string, id: number) => ({
    amount: parseFloat(advance),
    driverTripId: id,
    advanceDate: dayjs.utc().startOf('day').unix()
})
export const updateDriverAdvance = async (req: Request, res: Response) => {
    const dataBody = req.body
    const driverTrip = await getDriverIdByTripId(dataBody.tripId)
    if (driverTrip === null) return res.sendStatus(500)
    await createDriverAdvance(creatData(dataBody.driverAdvance, driverTrip.id))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

interface Query {
    id: string
}
export const listAllDriverTripByOverallId = async (
    req: Request<object, object, object, Query>,
    res: Response
) => {
    const overallId = parseInt(req.query.id)
    const tripSalaryId: number[] = []
    const driverTrip = await getDriverTripByOverallId(overallId)
    const tripId = driverTrip.map((data) => data.tripId)
    const expenses = await getAllExpenseCountByTripId(tripId)
    driverTrip.forEach(({ stockTripSalaryId, unloadingTripSalaryId }) => {
        tripSalaryId.push(stockTripSalaryId || 0, unloadingTripSalaryId || 0)
    })
    const tripSalaryDetails = await getTripSalaryDetailsById(tripSalaryId)
    res.status(200).json({ expenses, tripSalaryDetails, driverTrip })
}
interface Driver {
    name: string
}
interface DriverAdvance {
    driver: Driver
    driverAdvanceForTrip: { amount: number }[]
}
function calculateTotalAdvance(driverAdvance: DriverAdvance) {
    return driverAdvance.driverAdvanceForTrip.reduce((sum, advance) => sum + advance.amount, 0)
}
async function amounts(tripId: number): Promise<number> {
    const tripExpenses = await getExpensesByTripIds(tripId)
    return tripExpenses.reduce((total, expense) => total + (expense.acceptedAmount || 0), 0)
}
async function advances(tripId: number): Promise<DriverAdvance[]> {
    const driverAdvances = await getDriverAdvance(tripId)
    return driverAdvances.map((driverAdvance) => ({
        tripId,
        driver: driverAdvance.driver,
        driverAdvanceForTrip: [{ amount: calculateTotalAdvance(driverAdvance) }]
    }))
}
export const getDriverAdvanceAndExpenses = async (
    req: Request<object, object, object, Query>,
    res: Response
) => {
    const tripId = parseInt(req.query.id)
    const [totalAmount, updatedAdvances] = await Promise.all([amounts(tripId), advances(tripId)])
    return res.status(200).json({ driverAdvances: updatedAdvances, amount: totalAmount })
}
