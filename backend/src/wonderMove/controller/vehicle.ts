import { Request, Response } from 'express'
import {
    create as createInDb,
    getAllVehicles,
    fetchVehicleByNumber as getDetailsFromDb,
    updateVehicleByNumber as updateInDB
} from '../models/vehicle.ts'

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(() => res.sendStatus(200))
}

export const update = (req: Request, res: Response) => {
    // todo: check if vehicle number in param and body matches
    updateInDB(req.params.number, req.body).then(() => res.sendStatus(200))
}

export const listAllNumbers = (_req: Request, res: Response) => {
    getAllVehicles().then((numbers) => res.status(200).json(numbers))
}

export const getDetails = (req: Request, res: Response) => {
    getDetailsFromDb(req.params.number).then((detail) => res.status(200).json(detail))
}
