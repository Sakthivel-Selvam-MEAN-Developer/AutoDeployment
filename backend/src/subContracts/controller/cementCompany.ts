import { Request, Response } from 'express'
import { create, getAllCementCompany } from '../models/cementCompany.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'

export const createCompany = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch((error) => handlePrismaError(error, res))
}
export const listAllCementCompany = (_req: Request, res: Response) => {
    getAllCementCompany()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
