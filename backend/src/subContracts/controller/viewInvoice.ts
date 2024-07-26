import { Request, Response } from 'express'
import {
    getCompanyInvoice,
    getInvoiceToAddAdvisory
} from '../models/companyInvoice/companyInvoice.ts'
import {
    updateInvoiceReceived,
    updateShortageDetailsModel
} from '../models/companyInvoice/updateCompanyInvoice.ts'
import { pageCount, pageCountForAddAdvisory } from '../models/companyInvoice/pageCount.ts'
import { RequestQuery } from './viewInvoiceType.ts'
export type getCompanyInvoiceProps = (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => void
export const getInvoicedTrip: getCompanyInvoiceProps = async (req, res) => {
    const filterData = filterDatas(req.query)
    const count = await pageCount(filterData)
    await getCompanyInvoice(filterData)
        .then((data) => res.status(200).json({ data, count }))
        .catch(() => res.status(500))
}
export const getInvoicedToAddAdvisoryDetails: getCompanyInvoiceProps = async (req, res) => {
    const filterData = filterDatas(req.query)
    const count = pageCountForAddAdvisory(filterData)
    await getInvoiceToAddAdvisory(filterData)
        .then((data) => res.status(200).json({ data, count }))
        .catch(() => res.status(500))
}
export const filterDatas = (query: RequestQuery) => {
    return {
        startDate: parseInt(query.startDate),
        endDate: parseInt(query.endDate),
        company: query.cementCompany.id,
        pageNumber: parseInt(query.pageNumber),
        received: query.received,
        GSTReceived: query.GSTReceived
    }
}
export const updateShortageDetails = (req: Request, res: Response) =>
    updateInvoiceReceived(req.body.invoiceId)
        .then(() => {
            if (req.body.shortageAmount === 0) return res.sendStatus(200)
            updateShortageDetailsModel(req.body).then(() => res.sendStatus(200))
        })
        .catch(() => res.sendStatus(500))
