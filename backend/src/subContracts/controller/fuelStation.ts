import { Request, Response } from 'express'
import { create, getAllFuelStationByBunk } from '../models/fuelStation.ts'

export const createFuelStation = (req: Request, res: Response) => {
    create(req.body).then(() => res.sendStatus(200))
}

export const listAllFuelStationByBunk = (req: Request, res: Response) => {
    getAllFuelStationByBunk(parseInt(req.params.bunkId)).then((data) => res.status(200).json(data))
}
