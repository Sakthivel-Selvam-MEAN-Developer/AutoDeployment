import { Request, Response } from 'express'
import {
    create,
    getAllUnloadingPoint,
    getUnloadingPointByCompany
} from '../models/unloadingPoint.ts'
import { create as createPricePointMarker } from '../models/pricePointMarker.ts'

export const createUnloadingPoint = async (req: Request, res: Response) => {
    const { name, cementCompanyId, location } = req.body
    await createPricePointMarker({ location })
        .then((data) => create({ name, cementCompanyId, pricePointMarkerId: data.id }))
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}

export const listAllUnloadingPoint = (req: Request, res: Response) => {
    getAllUnloadingPoint(parseInt(req.params.cementCompanyId))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listUnloadingPonitBycementCompany = (req: Request, res: Response) => {
    getUnloadingPointByCompany(req.params.companyName)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
