import { Request, Response } from 'express'
import { create, getPricePoint } from '../models/pricePoint.ts'

export const createPricePoint = (req: Request, res: Response) => {
    console.log('Price Point')
    create(req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listPricePoint = (req: Request, res: Response) => {
    const { unloadingPointId, loadingPointId, stockPointId } = req.params
    getPricePoint(parseInt(loadingPointId), parseInt(unloadingPointId), parseInt(stockPointId))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
