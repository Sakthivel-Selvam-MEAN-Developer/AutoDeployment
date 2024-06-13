import { Request, Response } from 'express'
import { create, updateBillStatus } from '../models/tollPlaza.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'

export const createTollLocation = (req: Request, res: Response) =>
    create(req.body)
        .then((data) => res.status(200).json(data))
        .catch((error) => handlePrismaError(error, res))

export const updateTollDetails = (req: Request, res: Response) => {
    const { overallTripId, data } = req.body
    updateBillStatus(overallTripId, data)
        .then((details) => res.status(200).json(details))
        .catch((error) => handlePrismaError(error, res))
}
