import { Request, Response } from 'express'
import { getAllAccountTypes } from '../models/accountType.ts'

export const listAllAccountTypes = (_req: Request, res: Response) => {
    getAllAccountTypes()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
