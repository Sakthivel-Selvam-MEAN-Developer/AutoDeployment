import { getInvoiceFoeGSTModel } from '../models/companyInvoice/companyInvoice'
import { pageCountForGST } from '../models/companyInvoice/pageCount'
import { filterDatas, getCompanyInvoiceProps } from './viewInvoice'

export const getInvoicedForGST: getCompanyInvoiceProps = async (req, res) => {
    const filterData = filterDatas(req.query)
    const count = pageCountForGST(filterData)
    await getInvoiceFoeGSTModel(filterData)
        .then((data) => res.status(200).json({ data, count }))
        .catch(() => res.status(500))
}
