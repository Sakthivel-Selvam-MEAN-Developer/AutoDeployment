import { Request, Response } from 'express'
import {
    create,
    getAllUnloadingPoint,
    getUnloadingPointByCompany
} from '../models/unloadingPoint.ts'

export const createUnloadingPoint = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}

export const listAllUnloadingPoint = (_req: Request, res: Response) => {
    getAllUnloadingPoint()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listUnloadingPonitBycementCompany = (req: Request, res: Response) => {
    getUnloadingPointByCompany(req.params.companyName)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
