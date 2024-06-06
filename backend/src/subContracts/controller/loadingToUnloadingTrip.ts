import { Request, Response } from 'express'
import { create, getAllTrip, getTripByVehicleNumber } from '../models/loadingToUnloadingTrip.ts'
import { create as createOverallTrip } from '../models/overallTrip.ts'
import {
    create as createPaymentDues,
    getPaymentDuesWithoutTripId,
    updatePaymentDuesWithTripId
} from '../models/paymentDues.ts'
import { getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import { getPricePoint } from '../models/pricePoint.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import {
    amountCalculation,
    loadingToUnloadingTripLogic
} from '../domain/loadingToUnloadingTripLogic.ts'

export interface props {
    truck: {
        transporter: {
            name: string
            transporterType: string
        }
        vehicleNumber: string
    }
    loadingPoint: {
        cementCompany: { advanceType: number }
    }
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
    bunk: {
        bunkName: string
    }
    bunkId: number
    overallTripId: number | null
    createdAt: Date
    updatedAt: Date
}
const updateFuelDetails = (
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
    let details: props = {
        truck: {
            vehicleNumber: '',
            transporter: { name: '', transporterType: '' }
        },
        loadingPoint: { cementCompany: { advanceType: 0 } }
    }
    try {
        const body = await amountCalculation(req)
        const pricePoint = await getPricePoint(
            req.body.loadingPointId,
            req.body.unloadingPointId,
            req.body.stockPointId
        )
        const { id: overallTripId } = await create(body).then(async (data) => {
            details = data
            return createOverallTrip({
                loadingPointToUnloadingPointTripId: data.id,
                finalPayDuration: pricePoint?.payGeneratingDuration
            })
        })
        const fuelDetails = await getFuelWithoutTrip(details.truck.vehicleNumber)
        await loadingToUnloadingTripLogic(
            details.truck.transporter.transporterType,
            body,
            fuelDetails,
            details.truck.transporter.name,
            overallTripId,
            details.truck.vehicleNumber,
            'LoadingToUnloading',
            details.loadingPoint.cementCompany.advanceType,
            res
        )
            .then(async (data) => {
                if (data === undefined) return res.status(200)
                await createPaymentDues(data)
            })
            .then(async () => {
                await updateFuelDetails(fuelDetails, details.truck.vehicleNumber, overallTripId)
            })
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
