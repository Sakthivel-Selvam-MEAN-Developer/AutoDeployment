import { Request, Response } from 'express'
import { create, getAllStockPointTrip } from '../models/loadingToStockPointTrip.ts'

export const createStockPointTrip = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}

export const listAllStockPointTrip = (_req: Request, res: Response) => {
    getAllStockPointTrip().then((data) => res.status(200).json(data))
}
