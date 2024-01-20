import { Request, Response } from 'express'
import {
    closeAcknowledgementStatusforOverAllTrip,
    getOverAllTripByAcknowledgementStatus,
    getOverAllTripById
} from '../models/overallTrip.ts'

export const listAllActivetripTripToByAcknowledgementStatus = (_req: Request, res: Response) => {
    getOverAllTripByAcknowledgementStatus()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const updateAcknowledgementStatusforOverAllTrip = (req: Request, res: Response) => {
    closeAcknowledgementStatusforOverAllTrip(req.body.id)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const OverAllTripById = (req: Request, res: Response) => {
    getOverAllTripById(parseInt(req.params.id))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
