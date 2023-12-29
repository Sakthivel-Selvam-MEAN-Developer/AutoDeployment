import { Request, Response } from 'express'
import { create, getAllFuel, getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import { getOnlyActiveTripByVehicleNumber } from '../models/loadingToUnloadingTrip.ts'

export const createFuel = async (req: Request, res: Response) => {
    const { vehicleNumber } = req.body
    const activeTrip = await getOnlyActiveTripByVehicleNumber(vehicleNumber)
    create({ ...req.body, loadingPointToUnloadingPointTripId: activeTrip?.id })
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
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
