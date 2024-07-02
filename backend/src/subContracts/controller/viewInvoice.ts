import { Request, Response } from 'express'
import { getCompanyInvoice } from '../models/viewInvoice.ts'

export const getInvoicedTrip = (_req: Request, res: Response) => {
    getCompanyInvoice()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
