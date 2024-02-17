import { Request, Response } from 'express'
import { create, getAllBunk, getAllBunkName } from '../models/bunk.ts'

export const createBunk = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}

export const listAllBunk = (_req: Request, res: Response) => {
    getAllBunk()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listAllBunkName = (_req: Request, res: Response) => {
    getAllBunkName()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
