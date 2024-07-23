import { Request, Response } from 'express'
import {
    getCompanyInvoice,
    getCompanyInvoiceNameList,
    getInvoiceToAddAdvisory,
    pageCount
} from '../models/companyInvoice/companyInvoice.ts'
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
export const getInvocieNameList = async (_req: Request, res: Response) => {
    await getCompanyInvoiceNameList()
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
