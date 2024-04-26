import { Request, Response } from 'express'
import { create, getAllStockPoint, getStockPointByCompany } from '../models/stockPoint.ts'
import { create as createPricePointMarker } from '../models/pricePointMarker.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'

export const createStockPoint = async (req: Request, res: Response) => {
    const { name, cementCompanyId, location } = req.body
    await createPricePointMarker({ location })
        .then((data) => create({ name, cementCompanyId, pricePointMarkerId: data.id }))
        .then(() => res.sendStatus(200))
        .catch((error) => handlePrismaError(error, res))
}

export const listAllStockPoint = (_req: Request, res: Response) => {
    getAllStockPoint()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listStockPointBycementCompany = (req: Request, res: Response) => {
    getStockPointByCompany(req.params.companyName)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
