import { Request, Response } from 'express'
import {
    getOverallTrip,
    getTripDetailsByCompanyName,
    overallTripByFilter
} from '../models/overallTrip.ts'

export const listOverallTrip = (_req: Request, res: Response) => {
    getOverallTrip()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listgetOverallTripById = (req: Request, res: Response) => {
    const { companyId, transporterId, loadingPointId, from, to } = req.params
    overallTripByFilter(
        parseInt(companyId),
        parseInt(transporterId),
        parseInt(loadingPointId),
        parseInt(from),
        parseInt(to)
    )
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listTripDetailsByCompanyName = (req: Request, res: Response) => {
    getTripDetailsByCompanyName(req.params.company)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
