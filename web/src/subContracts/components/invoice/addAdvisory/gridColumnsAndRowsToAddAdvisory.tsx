import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { invoice } from './list'

export interface row {
    index: number
    id: number
    cementCompany: string
    billDate: number
    billNo: string
    amount: number
    GSTAmount: number
    TDSAmount: number
}

export const columns = [
    { field: 'index', headerName: '#', flex: 0.1 },
    { field: 'cementCompany', headerName: 'Cement Company', flex: 1 },
    {
        field: 'billDate',
        headerName: 'Invoice Date',
        flex: 1,
        valueFormatter: (billDate: number) => epochToMinimalDate(billDate)
    },
    { field: 'billNo', headerName: 'Bill Number', flex: 1 },
    { field: 'amount', headerName: 'Taxable Amount', flex: 1 },
    { field: 'shortageAmount', headerName: 'Shortage Amount', flex: 1 },
    { field: 'shortageBillNo', headerName: 'Shortage Bill No', flex: 1 },
    { field: 'action', headerName: 'Action', flex: 1 }
]

export const getRows = (invoice: invoice['data']) => {
    return invoice.map((inv, index) => {
        return {
            index: index + 1,
            id: inv.id,
            cementCompany: inv.cementCompany.name,
            billDate: inv.billDate,
            billNo: inv.billNo,
            amount: inv.amount,
            GSTAmount: inv.GSTAmount,
            TDSAmount: inv.TDSAmount
        }
    })
}
