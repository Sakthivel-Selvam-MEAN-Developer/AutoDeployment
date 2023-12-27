import { Request, Response } from 'express'
import { create, getAllFuel } from '../models/fuel.ts'
import { getOnlyActiveTripByVehicleNumber } from '../models/loadingToUnloadingTrip.ts'

export const createFuel = async (req: Request, res: Response) => {
    const { vehicleNumber } = req.body
    const activeTrip = await getOnlyActiveTripByVehicleNumber(vehicleNumber)
    create({ ...req.body, loadingPointToUnloadingPointTripId: activeTrip?.id }).then(() =>
        res.sendStatus(200)
    )
}

export const listAllFuel = (_req: Request, res: Response) => {
    getAllFuel().then((data) => res.status(200).json(data))
}
