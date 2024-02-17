import { Request, Response } from 'express'
import { getAllTransporter, create, getAllTransporterName } from '../models/transporter.ts'

export const createTransporter = (req: Request, res: Response) => {
    create(req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
export const listAllTransporter = (_req: Request, res: Response) => {
    getAllTransporter()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const listAllTransporterName = (_req: Request, res: Response) => {
    getAllTransporterName()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
