import { Request, Response } from 'express'
import { create, getAllLoadingPoint, getLoadingPointByCompany } from '../models/loadingPoint.ts'
import { create as createPricePointMarker } from '../models/pricePointMarker.ts'

export const createLoadingPoint = async (req: Request, res: Response) => {
    const { name, cementCompanyId, location } = req.body
    await createPricePointMarker({ location })
        .then((data) => create({ name, cementCompanyId, pricePointMarkerId: data.id }))
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}

export const listAllLoadingPoint = (_req: Request, res: Response) => {
    getAllLoadingPoint()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listLoadingPointByCementCompany = (req: Request, res: Response) => {
    getLoadingPointByCompany(req.params.companyName)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
