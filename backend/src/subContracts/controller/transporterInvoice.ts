import { Request, Response } from 'express'
import { getTripByTransporterInvoice, updateTransporterInvoice } from '../models/overallTrip.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'
import { finalDueCreation } from '../domain/overallTrip/acknowledgementApprovalEvent.ts'
import { convertData } from './acknowledgementApproval.ts'

export const listTripByTransporterInvoice = (req: Request, res: Response) => {
    const invoiceNumber = req.query.invoiceNumber === '' ? undefined : req.query.invoiceNumber
    getTripByTransporterInvoice(invoiceNumber as string)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
interface finalDuePropsfalse {
    name?: string
    type: string
    dueDate: number
    overallTripId: number
    vehicleNumber?: string
    payableAmount: number
}
export const updateTransporterInvoiceinTrip = (req: Request, res: Response) => {
    updateTransporterInvoice(req.body.invoice, req.body.id)
        .then(async (data) => {
            await finalDueCreation(data).then(
                async (due: boolean | undefined | finalDuePropsfalse[]) => {
                    if (due === undefined || typeof due === 'boolean') return res.sendStatus(200)
                    await createPaymentDues(convertData(due)).then(() => res.sendStatus(200))
                }
            )
        })
        .catch(() => res.sendStatus(500))
}
