import { Request, Response } from 'express'
import { getCompanyInvoice } from '../models/viewInvoice.ts'

interface RequestQuery {
    pageName: string
    startDate: string
    endDate: string
    cementCompany: { id: string }
}
type getCompanyInvoiceProps = (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => void

export const getInvoicedTrip: getCompanyInvoiceProps = async (req, res) => {
    const filterData = {
        startDate: parseInt(req.query.startDate),
        endDate: parseInt(req.query.endDate),
        company: req.query.cementCompany.id
    }
    await getCompanyInvoice(filterData)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
