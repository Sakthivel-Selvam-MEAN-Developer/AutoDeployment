import { Request, Response } from 'express'
import { create, getPricePoint } from '../models/pricePoint.ts'

export const createPricePoint = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}

export const listPricePoint = (req: Request, res: Response) => {
    getPricePoint(
        parseInt(req.params.loadingPointId as string, 10),
        parseInt(req.params.unloadingPointId as string, 10)
    )
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
