import { Request, Response } from 'express'
import { create, getPricePoint } from '../models/pricePoint.ts'

export const createPricePoint = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}

export const listPricePoint = (req: Request, res: Response) => {
    getPricePoint(
        parseInt(req.params.loadingPointId),
        parseInt(req.params.unloadingPointId),
        parseInt(req.params.stockPointId)
    )
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
