import { Request, Response } from 'express'
import { getAllTransporter } from '../models/transporter.ts'

export const listAllTransporter = (_req: Request, res: Response) => {
    getAllTransporter()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
