import { Request, Response } from 'express'
import { create, getAllBunk } from '../models/bunk.ts'

export const createBunk = (req: Request, res: Response) => {
    create(req.body).then(() => res.sendStatus(200))
}

export const listAllBunk = (_req: Request, res: Response) => {
    getAllBunk().then((data) => res.status(200).json(data))
}
