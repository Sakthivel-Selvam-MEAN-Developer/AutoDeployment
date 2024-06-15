import { Request, Response } from 'express'
import {
    create,
    getAllTrip,
    getAllUnloadingPointUnbilledTrips,
    getTripByVehicleNumber
} from '../models/loadingToUnloadingTrip.ts'
import { create as createOverallTrip } from '../models/overallTrip.ts'
import { getPaymentDuesWithoutTripId, updatePaymentDuesWithTripId } from '../models/paymentDues.ts'
import { getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import { getPricePoint } from '../models/pricePoint.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import { amountCalculation } from '../domain/overallTrip/loadingToUnloadingTripEvent.ts'

export interface props {
    truck: {
        transporter: { name: string; transporterType: string }
        vehicleNumber: string
    }
    loadingPoint: { cementCompany: { advanceType: number } }
}
export const listAllTrip = (_req: Request, res: Response) => {
    getAllTrip().then((data) => res.status(200).json(data))
}
export interface fuelProps {
    id: number
    fueledDate: number
    invoiceNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    dieselkilometer: number
    fuelType: string | null
    paymentStatus: boolean
    vehicleNumber: string
    bunk: { bunkName: string }
    bunkId: number
    overallTripId: number | null
    createdAt: Date
    updatedAt: Date
}
const updateFuelDetails = async (
    fuelDetails: fuelProps | null,
    vehicleNumber: string,
    overallTripId: number
) => {
    if (!fuelDetails) return
    return updateFuelWithTripId({ id: fuelDetails.id, overallTripId })
        .then(() => getPaymentDuesWithoutTripId(vehicleNumber))
        .then((paymetDue) => updatePaymentDuesWithTripId({ id: paymetDue?.id, overallTripId }))
}
export const createTrip = async (req: Request, res: Response) => {
    try {
        let vehicleNumber = ''
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
        const { id: overallTripId } = await create(body).then(async (data) => {
            vehicleNumber = data.truck.vehicleNumber
            return createOverallTrip({
                loadingPointToUnloadingPointTripId: data.id,
                finalPayDuration: pricePoint?.payGeneratingDuration
            })
        })
        const fuelDetails = await getFuelWithoutTrip(vehicleNumber)
        await updateFuelDetails(fuelDetails, vehicleNumber, overallTripId)
            .then(() => res.status(200).json({ id: overallTripId }))
            .catch((error) => handlePrismaError(error, res))
    } catch (error) {
        handlePrismaError(error, res)
    }
}

export const ListTripByVehicleNumber = (req: Request, res: Response) => {
    getTripByVehicleNumber(req.params.trucknumber)
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
export const listAllUnloadingPointUnbilledTrips = (_req: Request, res: Response) => {
    getAllUnloadingPointUnbilledTrips().then((data) => res.status(200).json(data))
}
