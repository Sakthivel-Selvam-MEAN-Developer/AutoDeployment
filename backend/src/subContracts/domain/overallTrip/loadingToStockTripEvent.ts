import { Request } from 'express'

export const amountCalculation = async (
    req: Request,
    transporterAmount: number,
    freightAmount: number
) => {
    const totalTransporterAmount = transporterAmount * req.body.filledLoad
    const totalFreightAmount = freightAmount * req.body.filledLoad
    const margin = parseFloat(((totalFreightAmount - totalTransporterAmount) * 0.7).toFixed(2))
    return {
        ...req.body,
        totalFreightAmount: parseFloat(totalFreightAmount.toFixed(2)),
        totalTransporterAmount: parseFloat(totalTransporterAmount.toFixed(2)),
        margin,
        transporterAmount,
        freightAmount
    }
}
