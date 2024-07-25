import { Request, Response } from 'express'
import {
    getCompanyInvoice,
    getInvoiceToAddAdvisory,
    pageCount
} from '../models/companyInvoice/companyInvoice.ts'
import {
    updateInvoiceReceived,
    updateShortageDetailsModel
} from '../models/companyInvoice/updateCompanyInvoice.ts'
interface RequestQuery {
    startDate: string
    endDate: string
    cementCompany: { id: string }
    pageNumber: string
}
type getCompanyInvoiceProps = (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => void
export const getInvoicedTrip: getCompanyInvoiceProps = async (req, res) => {
    const filterData = filterDatas(req)
    const count = await pageCount(filterData)
    await getCompanyInvoice(filterData)
        .then((data) => res.status(200).json({ data, count }))
        .catch(() => res.status(500))
}
export const getInvoicedToAddAdvisoryDetails: getCompanyInvoiceProps = async (req, res) => {
    const filterData = filterDatas(req)
    await getInvoiceToAddAdvisory(filterData)
        .then((data) => res.status(200).json({ data, count: data.length }))
        .catch(() => res.status(500))
}
function filterDatas(req: Request<object, object, object, RequestQuery, Record<string, number>>) {
    return {
        startDate: parseInt(req.query.startDate),
        endDate: parseInt(req.query.endDate),
        company: req.query.cementCompany.id,
        pageNumber: parseInt(req.query.pageNumber)
    }
}
export const updateShortageDetails = (req: Request, res: Response) => {
    updateInvoiceReceived(req.body.invoiceId)
        .then(() => {
            if (req.body.shortageAmount === 0) return res.sendStatus(200)
            updateShortageDetailsModel(req.body).then(() => res.sendStatus(200))
        })
        .catch(() => res.sendStatus(500))
}
