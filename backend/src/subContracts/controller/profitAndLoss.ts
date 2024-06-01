import { Request, Response } from 'express'
import { getOverallTripByVehicleNumber } from '../models/overallTrip.ts'
import { profitAndLossLogic } from '../domain/profitAndLossLogic.ts'

interface query {
    vehicleNumber: string
}
export const profitAndLossController = async (
    req: Request<object, object, object, query>,
    res: Response
) => {
    const tripDetails = await getOverallTripByVehicleNumber(req.query.vehicleNumber)
    const details = await profitAndLossLogic(req.headers, tripDetails[1])
    res.status(200).send(details)
}
