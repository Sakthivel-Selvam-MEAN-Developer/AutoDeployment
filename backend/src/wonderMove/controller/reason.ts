import { Request, Response } from 'express'
import { create as createInDb, getAllReason, update } from '../models/stopReason.ts'

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(() => res.send(200))
}

export const updateReason = (req: Request, res: Response) => {
    update(req.body).then(() => res.sendStatus(200))
}

export const listAllReason = (_req: Request, res: Response) => {
    getAllReason().then((name) => res.status(200).json(name))
}
