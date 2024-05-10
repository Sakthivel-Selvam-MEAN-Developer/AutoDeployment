import { Request, Response } from 'express'
import { getTripByTransporterInvoice, updateTransporterInvoice } from '../models/overallTrip.ts'
import { finalDueCreation } from './acknowledgement.ts'

export const listTripByTransporterInvoice = (_req: Request, res: Response) => {
    getTripByTransporterInvoice()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
const checkPreFinalPay = (data: object, finalPay: undefined | object, res: Response) => {
    if (finalPay !== undefined) return res.status(200).json(data)
}
export const updateTransporterInvoiceinTrip = (req: Request, res: Response) => {
    updateTransporterInvoice(req.body.invoice, req.body.id)
        .then(async (data) => {
            if (data.acknowledgementStatus === false) return res.status(200).json(data)
            const finalPay = data.paymentDues.find((due) => due.type === 'final pay')
            checkPreFinalPay(data, finalPay, res)
            await finalDueCreation(data, res)
        })
        .catch(() => res.status(500))
}
