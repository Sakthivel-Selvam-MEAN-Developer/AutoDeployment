import { Request, Response } from 'express'
import { create, getAllDriver } from '../models/driver.ts'

export const createDriver = async (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
export const listAllDriver = async (_req: Request, res: Response) => {
    getAllDriver()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
