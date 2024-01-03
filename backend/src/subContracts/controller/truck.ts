import { Request, Response } from 'express'
import { getAllTruck, getTruckByTransporter } from '../models/truck.ts'

export const listAllTruck = (_req: Request, res: Response) => {
    getAllTruck().then((data) => res.status(200).json(data))
}

export const listTruckByTransporter = (req: Request, res: Response) => {
    getTruckByTransporter(req.params.transporterName)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
