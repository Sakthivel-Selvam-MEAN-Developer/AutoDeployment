import { Request, Response } from 'express'
import { create, getAllDriverTripById } from '../models/driverTrip.ts'
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
const getOverallTrip = async (
    allTrips: { id: number; tripId: number; tripSalaryId: number | null }[]
) => {
    const tripSalaryIds: number[] = []
    const overAllTripIds: number[] = []
    allTrips.forEach((tripId) => {
        tripSalaryIds.push(tripId.tripSalaryId !== null ? tripId.tripSalaryId : 0)
        overAllTripIds.push(tripId.tripId)
    })
    const allTripsById = await getOverAllTripByArrayOfId(overAllTripIds)
    const expensesDetails = await getAllExpenseCountByTripId(overAllTripIds)
    const tripDetails = await getTripSalaryDetailsById(tripSalaryIds)
    const combinedData = allTripsById.map((trip) => {
        const tripSalary = allTrips.filter((salary) => salary.tripId === trip.id)
        const totalTripSalary = tripSalary.map((data) => {
            const matchTripSalary = tripDetails.find((salary) => salary.id === data.tripSalaryId)
            return matchTripSalary
                ? {
                      tripBetta: matchTripSalary.tripBetta,
                      driverAdvance: matchTripSalary.driverAdvance
                  }
                : { tripBetta: 0, driverAdvance: 0 }
        })
        const totalTripBetta = totalTripSalary.reduce(
            (acc, getTripSalary) => acc + getTripSalary.tripBetta,
            0
        )
        const totalDriverAdvance = totalTripSalary.reduce(
            (acc, getTripSalary) => acc + getTripSalary.driverAdvance,
            0
        )
        return {
            ...trip,
            tripSalaryDeatails: {
                totalTripBetta,
                totalDriverAdvance,
                totalTripSalary: totalTripBetta - totalDriverAdvance,
                dailyBetta: tripDetails[0].dailyBetta
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
