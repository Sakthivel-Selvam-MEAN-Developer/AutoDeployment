import { Request, Response } from 'express'
import { create, getAllPricePoint, getPricePoint } from '../models/pricePoint.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'

export const createPricePoint = (req: Request, res: Response) => {
    create(req.body)
        .then((data) => res.status(200).json(data))
        .catch((error) => handlePrismaError(error, res))
}

export const listPricePoint = (req: Request, res: Response) => {
    const { unloadingPointId, loadingPointId, stockPointId } = req.params
    getPricePoint(parseInt(loadingPointId), parseInt(unloadingPointId), parseInt(stockPointId))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listAllPricePoint = (_req: Request, res: Response) => {
    getAllPricePoint()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
