import { Request, Response } from 'express'
import { create, getAllFactory, getFactoryByCompany } from '../models/factory.ts'

export const createFoctoryPoint = (req: Request, res: Response) => {
    create(req.body).then(() => res.send(200))
}

export const listAllFactory = (_req: Request, res: Response) => {
    getAllFactory().then((data) => res.status(200).json(data))
}

export const listFactoryBycementCompany = (req: Request, res: Response) => {
    getFactoryByCompany(req.params.companyName).then((data) => res.status(200).json(data))
}
