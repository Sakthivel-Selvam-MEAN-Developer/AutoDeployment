import { Request, Response } from 'express'
import { create, findTripWithActiveDues, getOnlyActiveDuesByName } from '../models/paymentDues.ts'

export const createPaymentDues = (req: Request, res: Response) => {
    create(req.body).then(() => res.sendStatus(200))
}

export const listOnlyActiveDues = (_req: Request, res: Response) => {
    getOnlyActiveDuesByName().then((data) => res.status(200).json(data))
}

export const listTripWithActiveDues = (req: Request, res: Response) => {
    findTripWithActiveDues(req.params.name).then((data) => res.status(200).json(data))
}
