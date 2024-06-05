import { Response, Request } from 'express'
import tripLogic, { fuelProps } from './tripLogics.ts'

export const loadingToStockTripLogic = async (
    transporterType: string,
    req: Request,
    fuelDetails: fuelProps | null,
    transporterName: string,
    overallTripId: number,
    vehicleNumber: string,
    type: string,
    advanceType: number,
    res: Response
) => {
    if (transporterType === 'Own') {
        res.status(200).json({ id: overallTripId })
        return
    }
    return tripLogic(
        req.body,
        fuelDetails,
        transporterName,
        overallTripId,
        vehicleNumber,
        type,
        advanceType
    )
}
