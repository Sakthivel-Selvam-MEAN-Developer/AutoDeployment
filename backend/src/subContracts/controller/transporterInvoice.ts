import { Request, Response } from 'express'
import { getTripByTransporterInvoice, updateTransporterInvoice } from '../models/overallTrip.ts'
import { finalDueCreation } from './acknowledgement.ts'

export const listTripByTransporterInvoice = (_req: Request, res: Response) => {
    getTripByTransporterInvoice()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const updateTransporterInvoiceinTrip = (req: Request, res: Response) => {
    updateTransporterInvoice(req.body.invoice, req.body.id)
        .then(async (data) => {
            if (data.acknowledgementStatus === false) return res.status(200).json(data)
            const finalPay = data.paymentDues.filter((due) => due.type === 'final pay')
            if (finalPay.length > 0) {
                return res.status(200).json(data)
            }
            await finalDueCreation(data, res)
        })
        .catch(() => res.status(500))
}
