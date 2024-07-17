import { Request, Response } from 'express'
import { getAllTransporter, getAllTransporterName } from '../models/transporter.ts'
import { create } from '../models/transporter.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'

export const createTransporter = (req: Request, res: Response) => {
    const { id, ...details } = req.body
    create(details, id)
        .then((data) => res.status(200).json(data))
        .catch((error) => handlePrismaError(error, res))
}
export const listAllTransporter = (_req: Request, res: Response) => {
    getAllTransporter()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const listAllTransporterName = (_req: Request, res: Response) => {
    getAllTransporterName()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
