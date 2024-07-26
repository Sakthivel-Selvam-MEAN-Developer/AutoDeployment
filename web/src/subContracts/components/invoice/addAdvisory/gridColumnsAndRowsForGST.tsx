import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { invoice } from './list'

export const columnsGST = [
    { field: 'cementCompany', headerName: 'Cement Company', flex: 1 },
    {
        field: 'billDate',
        headerName: 'Invoice Date',
        flex: 1,
        valueFormatter: (billDate: number) => epochToMinimalDate(billDate)
    },
    { field: 'billNo', headerName: 'Bill Number', flex: 1 },
    { field: 'amount', headerName: 'Taxable Amount', flex: 1 },
    { field: 'GSTAmount', headerName: 'GST', flex: 1 }
]

export const getRowsGST = (invoice: invoice['data']) => {
    return invoice.map((inv) => {
        return {
            id: inv.id,
            cementCompany: inv.cementCompany.name,
            billDate: inv.billDate,
            billNo: inv.billNo,
            amount: inv.amount,
            GSTAmount: inv.GSTAmount
        }
    })
}
