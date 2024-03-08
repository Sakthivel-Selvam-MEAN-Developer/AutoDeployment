import { Request, Response } from 'express'
import { getAllTruck, getTruckByTransporter, create } from '../models/truck.ts'

export const listAllTruck = (_req: Request, res: Response) => {
    getAllTruck()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const createTruck = (req: Request, res: Response) => {
    create(req.body)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json(error))
}
export const listTruckByTransporter = (req: Request, res: Response) => {
    getTruckByTransporter(req.params.transporterName)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
