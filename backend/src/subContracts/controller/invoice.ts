import { Request, Response } from 'express'
import { getInvoiceDetail } from '../models/invoice.ts'

export const getInvoiceDetails = (req: Request, res: Response) => {
    getInvoiceDetail(req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
