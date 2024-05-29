import { Request, Response } from 'express'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import { getTripForPricePointApproval } from '../models/overallTrip.ts'

export const listTripsForPricePointApproval = (_req: Request, res: Response) => {
    getTripForPricePointApproval()
        .then((data) => res.status(200).json(data))
        .catch((error) => handlePrismaError(error, res))
}
