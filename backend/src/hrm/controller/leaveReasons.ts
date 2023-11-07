import { Request, Response } from 'express'
import { create as createInDb, getAllLeaveReason } from '../models/leaveReasons.ts'

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(() => res.sendStatus(200))
}

export const listAllReason = (_req: Request, res: Response) => {
    getAllLeaveReason().then((name) => res.status(200).json(name))
}
