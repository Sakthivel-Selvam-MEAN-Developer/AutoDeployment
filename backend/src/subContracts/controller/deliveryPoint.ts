import { Request, Response } from 'express'
import { getAllDeliveryPoint, getDeliveryPointByCompany } from '../models/deliveryPoint.ts'

export const listAllDeliveryPoint = (_req: Request, res: Response) => {
    getAllDeliveryPoint().then((data) => res.status(200).json(data))
}

export const listDeliveryPonitBycementCompany = (req: Request, res: Response) => {
    getDeliveryPointByCompany(req.params.companyName).then((data) => res.status(200).json(data))
}
