import { Request, Response } from 'express'
import { create, getAllFuel, getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import {
    getOnlyActiveTripByVehicleNumber,
    getTripByVehicleNumber
} from '../models/loadingToUnloadingTrip.ts'
import fuelLogics from '../domain/fuelLogics.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'

export const createFuel = async (req: Request, res: Response) => {
    const { vehicleNumber } = req.body
    const { bunkname } = req.params
    const activeTrip = await getOnlyActiveTripByVehicleNumber(vehicleNumber)
    await create({ ...req.body, loadingPointToUnloadingPointTripId: activeTrip?.id })
        .then(async (fuel) => {
            const trip = await getTripByVehicleNumber(vehicleNumber)
            await fuelLogics(fuel, trip, bunkname).then((dues: any) => {
                createPaymentDues(dues)
            })
        })
        .then(() => res.sendStatus(200))
        .catch((e) => {
            res.sendStatus(500)
            console.log(e)
        })
}

export const listAllFuel = (_req: Request, res: Response) => {
    getAllFuel().then((data) => res.status(200).json(data))
}

export const listFuelWithoutTripId = (req: Request, res: Response) => {
    getFuelWithoutTrip(req.params.vehiclenumber).then((data) => res.status(200).json(data))
}

export const updateFuelWithTrip = (req: Request, res: Response) => {
    updateFuelWithTripId(req.body).then((data) => res.status(200).json(data))
}
