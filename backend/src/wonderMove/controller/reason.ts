import { create as createInDb, getAllReason } from '../models/stopReason'
import { Request, Response } from 'express'

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(() => res.send(200))
}

export const listAllReason = (req: Request, res: Response) => {
    getAllReason().then((name) => res.status(200).json(name))
}
