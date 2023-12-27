import { Request, Response } from 'express'
import {
    create,
    updateTransporterBalance,
    getAllTrip,
    getTripByVehicleNumber,
    getOnlyActiveTrip
} from '../models/loadingToUnloadingTrip.ts'

export const listAllTrip = (_req: Request, res: Response) => {
    getAllTrip().then((data) => res.status(200).json(data))
}

export const listOnlyActiveTrip = (_req: Request, res: Response) => {
    getOnlyActiveTrip().then((data) => res.status(200).json(data))
}

export const createTrip = (req: Request, res: Response) => {
    create(req.body).then((data) => res.status(200).json(data))
}
export const updateBalance = (req: Request, res: Response) => {
    updateTransporterBalance(req.body).then((data) => res.status(200).json(data))
}
export const ListTripByVehicleNumber = (req: Request, res: Response) => {
    getTripByVehicleNumber(req.params.trucknumber).then((data) => res.status(200).json(data))
}
