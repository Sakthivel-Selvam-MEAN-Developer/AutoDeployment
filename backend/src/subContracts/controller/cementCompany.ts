import { Request, Response } from 'express'
import { getAllCementCompany } from '../models/cementCompany.ts'

export const listAllCementCompany = (_req: Request, res: Response) => {
    getAllCementCompany().then((data) => res.status(200).json(data))
}
