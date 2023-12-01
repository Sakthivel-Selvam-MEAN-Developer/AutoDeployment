import { Request, Response } from 'express'
import { getAllFactory, getFactoryByCompany } from '../models/factory.ts'

export const listAllFactory = (_req: Request, res: Response) => {
    getAllFactory().then((data) => res.status(200).json(data))
}

export const listFactoryBycementCompany = (req: Request, res: Response) => {
    getFactoryByCompany(req.params.companyName).then((data) => res.status(200).json(data))
}
