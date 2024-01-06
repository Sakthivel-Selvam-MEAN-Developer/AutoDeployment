import { Request, Response } from 'express'
import { create, getAllStockPoint, getStockPointByCompany } from '../models/stockPoint.ts'

export const createStockPoint = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
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
