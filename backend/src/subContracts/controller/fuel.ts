import { Request, Response } from 'express'
import { create, getAllFuel } from '../models/fuel.ts'

export const createFuel = (req: Request, res: Response) => {
    create(req.body).then(() => res.sendStatus(200))
}

export const listAllFuel = (_req: Request, res: Response) => {
    getAllFuel().then((data) => res.status(200).json(data))
}
