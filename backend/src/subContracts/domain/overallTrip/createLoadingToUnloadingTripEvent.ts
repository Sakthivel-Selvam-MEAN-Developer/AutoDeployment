import { Response, Request } from 'express'
import tripLogic, { dataProps, fuelProps } from '../tripLogics.ts'

export const loadingToUnloadingTripLogic = async (
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
export const amountCalculation = async (
    req: Request,
    transporterAmount: number,
    freightAmount: number,
    transporterType: string
) => {
    const totalTransporterAmount = transporterAmount * req.body.filledLoad
    const totalFreightAmount = freightAmount * req.body.filledLoad
    const margin = parseFloat(((totalFreightAmount - totalTransporterAmount) * 0.7).toFixed(2))
    if (transporterType === 'Own') {
        return {
            ...req.body,
            totalFreightAmount: parseFloat(totalFreightAmount.toFixed(2)),
            totalTransporterAmount: 0,
            margin: 0,
            transporterAmount: 0,
            freightAmount
        }
    }
    return {
        ...req.body,
        totalFreightAmount: parseFloat(totalFreightAmount.toFixed(2)),
        totalTransporterAmount: parseFloat(totalTransporterAmount.toFixed(2)),
        margin,
        transporterAmount,
        freightAmount
    }
}
