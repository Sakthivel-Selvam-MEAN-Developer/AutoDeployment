import { Request, Response } from 'express'
import { updateGSTReceivedModel } from '../models/companyInvoice/updateCompanyInvoice'

export const updateGSTReceived = (req: Request, res: Response) => {
    const { ids } = req.body
    updateGSTReceivedModel(ids)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
