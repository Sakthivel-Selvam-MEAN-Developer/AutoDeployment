import { Request, Response } from 'express'
import { getCompanyInvoiceForSubmitDate } from '../models/companyInvoice'

export const listCompanyInvoiceForSubmitDate = (_req: Request, res: Response) => {
    getCompanyInvoiceForSubmitDate()
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
