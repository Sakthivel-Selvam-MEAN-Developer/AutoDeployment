import { Request, Response } from 'express'
import { create, getAllDeliveryPoint, getDeliveryPointByCompany } from '../models/deliveryPoint.ts'

export const createDeliveryPoint = (req: Request, res: Response) => {
    create(req.body).then(() => res.sendStatus(200))
}

export const listAllDeliveryPoint = (_req: Request, res: Response) => {
    getAllDeliveryPoint().then((data) => res.status(200).json(data))
}

export const listDeliveryPonitBycementCompany = (req: Request, res: Response) => {
    getDeliveryPointByCompany(req.params.companyName).then((data) => res.status(200).json(data))
}
