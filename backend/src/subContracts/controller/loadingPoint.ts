import { Request, Response } from 'express'
import { create, getAllLoadingPoint, getLoadingPointByCompany } from '../models/loadingPoint.ts'

export const createLoadingPoint = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}

export const listAllLoadingPoint = (_req: Request, res: Response) => {
    getAllLoadingPoint().then((data) => res.status(200).json(data))
}

export const listLoadingPointByCementCompany = (req: Request, res: Response) => {
    getLoadingPointByCompany(req.params.companyName).then((data) => res.status(200).json(data))
}
