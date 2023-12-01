import { Request, Response } from 'express'
import { create, getAllTrip } from '../models/factoryToCustomerTrip.ts'

export const listAllTrip = (_req: Request, res: Response) => {
    getAllTrip().then((data) => res.status(200).json(data))
}

export const createTrip = (req: Request, res: Response) => {
    create(req.body).then((data) => res.status(200).json(data))
}
