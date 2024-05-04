import { Request, Response } from 'express'
import { create, getAllDriverTripById } from '../models/driverTrip.ts'
import { getOverAllTripByArrayOfId } from '../../subContracts/models/overallTrip.ts'
import { getAllExpenseCountByTripId } from '../models/expenses.ts'

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
const getOverallTrip = async (tripIds: { tripId: number }[]) => {
    const allDriverTripIds = tripIds.map((ids) => ids.tripId)
    const data = await getOverAllTripByArrayOfId(allDriverTripIds)
    const expensesDetails = await getAllExpenseCountByTripId(allDriverTripIds)
    return { trips: data, expensesDetails }
}
export const listAllDriverTripById: listAllDriverTripByIdType = async (req, res) => {
    const { driverId } = req.query
    await getAllDriverTripById(parseInt(driverId))
        .then(async (tripIds) => getOverallTrip(tripIds))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
