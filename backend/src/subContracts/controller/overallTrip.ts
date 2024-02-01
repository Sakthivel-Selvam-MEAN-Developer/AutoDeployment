import { Request, Response } from 'express'
import { getOverallTrip, overallTripByFiltrer } from '../models/overallTrip.ts'

export const listOverallTrip = (_req: Request, res: Response) => {
    getOverallTrip()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listgetOverallTripById = (req: Request, res: Response) => {
    const { companyId, transporterId, loadingPointId } = req.params
    overallTripByFiltrer(parseInt(companyId), parseInt(transporterId), parseInt(loadingPointId))
        .then((data) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(() => res.status(500))
}
