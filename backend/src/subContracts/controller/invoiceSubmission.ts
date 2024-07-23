import { Request, Response } from 'express'
import { getCompanyInvoiceForSubmitDate } from '../models/companyInvoice/companyInvoice'
import { updateDueDate, updateSubmitDate } from '../models/companyInvoice/updateCompanyInvoice'
import dayjs from 'dayjs'

export const listCompanyInvoiceForSubmitDate = (_req: Request, res: Response) => {
    getCompanyInvoiceForSubmitDate()
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
const checkOffSetIsNull = (OffSetDays: number | null) => OffSetDays ?? 0
const calculateDueDate = (submissionDate: number | null, OffSetDays: number | null) => {
    const date = dayjs.unix(submissionDate ?? 0)
    return date.add(checkOffSetIsNull(OffSetDays), 'days').unix()
}
export const updateCompanyInvoiceSubmitDate = (req: Request, res: Response) =>
    updateSubmitDate(req.body)
        .then(async (data) => {
            const OffSetDays = data.cementCompany.paymentOffSetDays
            const dueDate = calculateDueDate(data.submissionDate, OffSetDays)
            await updateDueDate(req.body.id, dueDate)
        })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
