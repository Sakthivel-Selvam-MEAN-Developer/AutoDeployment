import { Request, Response } from 'express'
import { getTripByTransporterInvoice, updateTransporterInvoice } from '../models/overallTrip.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'
import { finalDueCreation } from '../domain/overallTrip/acknowledgementApprovalEvent.ts'

export const listTripByTransporterInvoice = (_req: Request, res: Response) => {
    getTripByTransporterInvoice()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
interface finalDuePropsfalse {
    name: string
    type: string
    dueDate: number
    overallTripId: number
    vehicleNumber: string
    payableAmount: number
}
export const updateTransporterInvoiceinTrip = (req: Request, res: Response) => {
    updateTransporterInvoice(req.body.invoice, req.body.id)
        .then(async (data) => {
            await finalDueCreation(data).then(
                async (finalDue: boolean | undefined | finalDuePropsfalse[]) => {
                    if (finalDue === undefined) return res.sendStatus(200)
                    if (typeof finalDue === 'boolean') return res.sendStatus(200)
                    await createPaymentDues(finalDue).then(() => res.sendStatus(200))
                }
            )
        })
        .catch(() => res.sendStatus(500))
}
