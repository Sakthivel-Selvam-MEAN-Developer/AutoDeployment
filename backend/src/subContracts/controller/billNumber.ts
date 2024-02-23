import { Request, Response } from 'express'
import { getBillNumber } from '../models/billNumber.ts'

export const getLastBillNumber = (_req: Request, res: Response) => {
    getBillNumber()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
