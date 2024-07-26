import { useEffect, useState } from 'react'
import AddAdvisory from './addAdvisory'
import { getInvoiceDetailsForGST, getInvoiceToAddAdvisory } from '../../../services/viewInvoice'
import { advisoryFilterData, filterDataProps } from './addAdvisoryContext'
const defaultFilterData = {
    startDate: 0,
    endDate: 0,
    cementCompany: { name: '', id: 0 },
    pageNumber: 1
}
interface invoiceData extends filterDataProps {
    GSTAmount: number
    TDSAmount: number
    cementCompany: { id: number; name: string }
    billNo: string
    billDate: number
    id: number
    amount: number
}
export interface invoice {
    data: invoiceData[]
    count: number
}
const List = () => {
    const [invoice, setInvoice] = useState<invoice>({ count: 0, data: [] })
    const [invoiceGST, setInvoiceGST] = useState<invoice>({ count: 0, data: [] })
    const [filterData, setFilterData] = useState<filterDataProps>(defaultFilterData)
    const onFilter = async () => {
        await getInvoiceToAddAdvisory(filterData).then(setInvoice)
        await getInvoiceDetailsForGST(filterData).then(setInvoiceGST)
    }
    useEffect(() => {
        onFilter()
    }, [filterData.pageNumber])
    return (
        <advisoryFilterData.Provider value={{ filterData, setFilterData }}>
            <AddAdvisory onFilter={onFilter} invoice={invoice} invoiceGST={invoiceGST} />
        </advisoryFilterData.Provider>
    )
}

export default List
