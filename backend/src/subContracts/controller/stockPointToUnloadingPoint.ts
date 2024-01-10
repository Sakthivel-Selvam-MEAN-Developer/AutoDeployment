import { Request, Response } from 'express'
import { create } from '../models/stockPointToUnloadingPoint.ts'

export const createStockPointToUnloadingPointTrip = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
