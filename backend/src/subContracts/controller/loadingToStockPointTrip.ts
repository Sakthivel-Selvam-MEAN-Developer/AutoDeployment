import { Request, Response } from 'express'
import { create, getAllStockPointTrip } from '../models/loadingToStockPointTrip.ts'
import { getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import { create as createOverallTrip } from '../models/overallTrip.ts'
import {
    create as createPaymentDues,
    getPaymentDuesWithoutTripId,
    updatePaymentDuesWithTripId
} from '../models/paymentDues.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import { getPricePoint } from '../models/pricePoint.ts'
import {
    amountCalculation,
    loadingToStockTripLogic
} from '../domain/overallTrip/createLoadingToStockTripEvent.ts'
import { props } from '../domain/types.ts'
import { getNumberByTruckId } from '../models/truck.ts'
import { fuelProps } from './loadingToUnloadingTrip.ts'

export const updateFuelDetails = (
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
    let details: props = {} as props
    try {
        const {
            vehicleNumber,
            transporter: { name, transporterType }
        } = (await getNumberByTruckId(req.body.truckId)) || {
            vehicleNumber: '',
            transporter: { name: '', transporterType: '' }
        }
        const pricePoint = await getPricePoint(
            req.body.loadingPointId,
            req.body.unloadingPointId,
            req.body.stockPointId
        )
        const body = await amountCalculation(
            req,
            pricePoint?.transporterAmount || 0,
            pricePoint?.freightAmount || 0,
            transporterType
        )
        const { id } = await create(body).then(async (data) => {
            details = data
            return createOverallTrip({
                loadingPointToStockPointTripId: data.id,
                finalPayDuration: pricePoint?.payGeneratingDuration
            })
        })
        const fuelDetails = await getFuelWithoutTrip(details?.truck.vehicleNumber)
        await loadingToStockTripLogic(
            transporterType,
            body,
            fuelDetails,
            name,
            id,
            vehicleNumber,
            'LoadingToStock',
            details.loadingPoint.cementCompany.advanceType,
            res
        )
            .then(async (data) => {
                if (data === undefined) return res.status(200)
                await createPaymentDues(data)
            })
            .then(async () => {
                await updateFuelDetails(fuelDetails, details.truck.vehicleNumber, id)
            })
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
