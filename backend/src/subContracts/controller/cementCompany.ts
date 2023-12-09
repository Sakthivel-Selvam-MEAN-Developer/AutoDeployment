import { Request, Response } from 'express'
import { create, getAllCementCompany } from '../models/cementCompany.ts'

export const createCompany = (req: Request, res: Response) => {
    create(req.body).then(() => res.sendStatus(200))
}

export const listAllCementCompany = (_req: Request, res: Response) => {
    getAllCementCompany().then((data) => res.status(200).json(data))
}
