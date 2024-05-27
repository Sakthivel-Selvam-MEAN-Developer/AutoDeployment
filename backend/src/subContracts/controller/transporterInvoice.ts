import { Request, Response } from 'express'
import { getTripByTransporterInvoice, updateTransporterInvoice } from '../models/overallTrip.ts'

export const listTripByTransporterInvoice = (_req: Request, res: Response) => {
    getTripByTransporterInvoice()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const updateTransporterInvoiceinTrip = (req: Request, res: Response) => {
    updateTransporterInvoice(req.body.invoice, req.body.id)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
