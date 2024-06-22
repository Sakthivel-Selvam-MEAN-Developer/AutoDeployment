import { Request, Response } from 'express'
import {
    create,
    updateBillDetails,
    getTollLocations,
    updateTollAmount
} from '../models/tollPlaza.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import { getOveralltripByToll, getOveralltripByTollNotEmpty } from '../models/overallTrip.ts'

export const createTollLocation = (req: Request, res: Response) =>
    create(req.body)
        .then((data) => res.status(200).json(data))
        .catch((error) => handlePrismaError(error, res))

export const updateTollDetails = (req: Request, res: Response) => {
    const { tollIds, data } = req.body
    updateBillDetails(tollIds, data)
        .then((details) => res.status(200).json(details))
        .catch((error) => handlePrismaError(error, res))
}
export const updateTollAmountDetails = (req: Request, res: Response) => {
    const { ids, data } = req.body
    updateTollAmount(ids, data)
        .then((details) => res.status(200).json(details))
        .catch((error) => handlePrismaError(error, res))
}
export const getOverallTripByToll = (_req: Request, res: Response) => {
    getOveralltripByToll()
        .then((details) => res.status(200).json(details))
        .catch((error) => handlePrismaError(error, res))
}
export const getOverallTripByTollNotEmpty = (_req: Request, res: Response) => {
    getOveralltripByTollNotEmpty()
        .then((overallTrip) => res.status(200).json(overallTrip))
        .catch((error) => handlePrismaError(error, res))
}
export const getTollLocation = (_req: Request, res: Response) => {
    getTollLocations()
        .then((details) => res.status(200).json(details))
        .catch((error) => handlePrismaError(error, res))
}
