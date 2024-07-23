import { Request, Response } from 'express'
import { getCompanyInvoiceForSubmitDate } from '../models/companyInvoice/companyInvoice'
import { updateSubmitDate } from '../models/companyInvoice/updateSubmissionDate'

export const listCompanyInvoiceForSubmitDate = (_req: Request, res: Response) => {
    getCompanyInvoiceForSubmitDate()
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}

export const updateCompanyInvoiceSubmitDate = (req: Request, res: Response) =>
    updateSubmitDate(req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
