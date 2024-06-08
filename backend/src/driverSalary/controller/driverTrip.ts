import { Request, Response } from 'express'
import {
    create,
    getAllDriverTripById,
    getDriverIdByTripId,
    getDriverTripByOverallId,
    updateDriverAdvanceByTripId
} from '../models/driverTrip.ts'
import { getOverAllTripByArrayOfId } from '../../subContracts/models/overallTrip.ts'
import { getAllExpenseCountByTripId } from '../models/expenses.ts'
import { getTripSalaryDetailsById } from '../models/tripSalary.ts'

export const createDriverTrip = async (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
type RequestQuery = {
    driverId: string
}
type listAllDriverTripByIdType = (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => void
interface allTripProps {
    id: number
    tripId: number
    unloadingTripSalaryId: number | null
    stockTripSalaryId: number | null
    driverAdvance: number[]
    primaryTripBetta: number | null
    secondaryTripBetta: number | null
    dailyBetta: number | null
}
type props = (
    tripAdvanceDetails: allTripProps | undefined,
    data: allTripProps
) => { totalTripBetta: number; totalAdvance: number | undefined }
const getTotalTripSalary: props = (tripAdvanceDetails, data) => {
    const totalAdvance = tripAdvanceDetails?.driverAdvance.reduce(
        (acc, current) => acc + current,
        0
    )
    const totalTripBetta =
        (data.primaryTripBetta ? data.primaryTripBetta : 0) +
        (data.secondaryTripBetta ? data.secondaryTripBetta : 0)
    return { totalTripBetta, totalAdvance }
}
const getOverallTrip = async (allTrips: allTripProps[]) => {
    const overAllTripIds: number[] = []
    allTrips.forEach((tripId) => overAllTripIds.push(tripId.tripId))
    const allTripsById = await getOverAllTripByArrayOfId(overAllTripIds)
    const expensesDetails = await getAllExpenseCountByTripId(overAllTripIds)
    const combinedData = allTripsById.map((trip) => {
        const tripSalary = allTrips.filter((salary) => salary.tripId === trip.id)
        const tripAdvanceDetails = allTrips.find((tripAdvance) => tripAdvance.tripId === trip.id)
        const totalTripSalary = tripSalary.map((data) =>
            getTotalTripSalary(tripAdvanceDetails, data)
        )
        return {
            ...trip,
            tripSalaryDeatails: {
                totalTripBetta: totalTripSalary && totalTripSalary[0].totalTripBetta,
                totalAdvance: totalTripSalary && totalTripSalary[0].totalAdvance,
                dailyBetta: tripSalary[0].dailyBetta,
                totalTripSalary:
                    totalTripSalary &&
                    totalTripSalary[0].totalTripBetta - (totalTripSalary[0].totalAdvance || 0)
            }
        }
    })
    return { trips: combinedData, expensesDetails }
}
export const listAllDriverTripById: listAllDriverTripByIdType = async (req, res) => {
    const { driverId } = req.query
    await getAllDriverTripById(parseInt(driverId))
        .then(async (allTrips) => getOverallTrip(allTrips))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const updateDriverAdvance = async (req: Request, res: Response) => {
    const dataBody = req.body
    const driverTrip = await getDriverIdByTripId(dataBody.tripId)
    updateDriverAdvanceByTripId(driverTrip?.id || 0, parseInt(dataBody.driverAdvance))
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
