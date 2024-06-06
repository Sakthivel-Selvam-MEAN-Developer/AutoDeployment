import { Response, Request } from 'express'
import tripLogic, { dataProps, fuelProps } from './tripLogics.ts'

export const loadingToStockTripLogic = async (
    transporterType: string,
    body: dataProps,
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
        body,
        fuelDetails,
        transporterName,
        overallTripId,
        vehicleNumber,
        type,
        advanceType
    )
}
export const amountCalculation = async (req: Request) => {
    const totalTransporterAmount = req.body.transporterAmount * req.body.filledLoad
    const totalFreightAmount = req.body.freightAmount * req.body.filledLoad
    const margin = totalFreightAmount - totalTransporterAmount
    return { ...req.body, totalFreightAmount, totalTransporterAmount, margin: margin * (70 / 100) }
}
