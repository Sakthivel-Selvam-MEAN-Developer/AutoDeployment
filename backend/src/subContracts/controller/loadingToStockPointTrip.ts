import { Request, Response } from 'express'
import {
    create,
    getAllStockPointTrip,
    getAllStockPointUnbilledTrips
} from '../models/loadingToStockPointTrip.ts'
import { getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import { create as createOverallTrip } from '../models/overallTrip.ts'
import { getPaymentDuesWithoutTripId, updatePaymentDuesWithTripId } from '../models/paymentDues.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import { getPricePoint } from '../models/pricePoint.ts'
import { amountCalculation } from '../domain/overallTrip/loadingToStockTripEvent.ts'
import { fuelProps } from './loadingToUnloadingTrip.ts'

export const updateFuelDetails = async (
    fuelDetails: fuelProps | null,
    vehicleNumber: string,
    overallTripId: number
) => {
    if (!fuelDetails) return
    return updateFuelWithTripId({ id: fuelDetails.id, overallTripId })
        .then(() => getPaymentDuesWithoutTripId(vehicleNumber))
        .then((paymetDue) => updatePaymentDuesWithTripId({ id: paymetDue?.id, overallTripId }))
}
export const createStockPointTrip = async (req: Request, res: Response) => {
    try {
        const pricePoint = await getPricePoint(
            req.body.loadingPointId,
            req.body.unloadingPointId,
            req.body.stockPointId
        )
        const body = await amountCalculation(
            req,
            pricePoint?.transporterAmount || 0,
            pricePoint?.freightAmount || 0
        )
        const { vehicleNumber, ...newData } = body
        const { id } = await create(newData).then(async (data) =>
            createOverallTrip({
                loadingPointToStockPointTripId: data.id,
                finalPayDuration: pricePoint?.payGeneratingDuration,
                truckId: req.body.truckId
            })
        )
        const fuelDetails = await getFuelWithoutTrip(vehicleNumber)
        await updateFuelDetails(fuelDetails, vehicleNumber, id)
            .then(() => res.status(200).json({ id }))
            .catch((error) => handlePrismaError(error, res))
    } catch (error) {
        handlePrismaError(error, res)
    }
}
export const listAllStockPointTrip = (_req: Request, res: Response) => {
    getAllStockPointTrip()
        .then((data) => {
            const dataWithoutStock = data.filter(
                (trip) => trip.stockPointToUnloadingPointTrip.length === 0
            )
            res.status(200).json(dataWithoutStock)
        })
        .catch(() => res.sendStatus(500))
}
export const listAllStockPointUnbilledTrips = (_req: Request, res: Response) => {
    getAllStockPointUnbilledTrips().then((data) => res.status(200).json(data))
}
