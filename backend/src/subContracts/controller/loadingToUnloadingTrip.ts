import { Request, Response } from 'express'
import { create, getAllTrip, getTripByVehicleNumber } from '../models/loadingToUnloadingTrip.ts'
import { create as createOverallTrip } from '../models/overallTrip.ts'
import tripLogic from '../domain/tripLogics.ts'
import { getNumberByTruckId } from '../models/truck.ts'
import {
    create as createPaymentDues,
    getPaymentDuesWithoutTripId,
    updatePaymentDuesWithTripId
} from '../models/paymentDues.ts'
import { getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import { getCementCompanyByLocation } from '../models/loadingPoint.ts'
import { getPricePoint } from '../models/pricePoint.ts'

export const listAllTrip = (_req: Request, res: Response) => {
    getAllTrip().then((data) => res.status(200).json(data))
}
const updateFuelDetails = (fuelDetails: any, vehicleNumber: string, overallTripId: number) => {
    if (!fuelDetails) return
    return updateFuelWithTripId({ id: fuelDetails.id, overallTripId })
        .then(() => getPaymentDuesWithoutTripId(vehicleNumber))
        .then((paymetDue) => updatePaymentDuesWithTripId({ id: paymetDue?.id, overallTripId }))
}

export const createTrip = async (req: Request, res: Response) => {
    try {
        const {
            vehicleNumber,
            transporter: { name, transporterType }
        } = (await getNumberByTruckId(req.body.truckId)) || {
            vehicleNumber: '',
            transporter: { name: '', transporterType: '' }
        }
        const companyDetails = await getCementCompanyByLocation(req.body.loadingPointId)
        const fuelDetails = await getFuelWithoutTrip(vehicleNumber)
        const pricePoint = await getPricePoint(
            req.body.loadingPointId,
            req.body.unloadingPointId,
            req.body.stockPointId
        )
        const { id: overallTripId } = await create(req.body).then(async (data) =>
            createOverallTrip({
                loadingPointToUnloadingPointTripId: data.id,
                finalPayDuration: pricePoint?.payGeneratingDuration
            })
        )
        if (transporterType === 'Own') return res.status(200).json({ id: overallTripId })
        await tripLogic(
            req.body,
            fuelDetails,
            name,
            overallTripId,
            vehicleNumber,
            'LoadingToUnloading',
            companyDetails?.cementCompany.advanceType
        )
            .then(async (data) => {
                if (data === undefined) return res.status(200)
                await createPaymentDues(data)
            })
            .then(async () => {
                await updateFuelDetails(fuelDetails, vehicleNumber, overallTripId)
            })
            .then(() => res.status(200).json({ id: overallTripId }))
            .catch(() => res.sendStatus(500))
    } catch (error) {
        res.status(500).json(error)
    }
}

export const ListTripByVehicleNumber = (req: Request, res: Response) => {
    getTripByVehicleNumber(req.params.trucknumber)
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
