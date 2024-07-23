import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { billProps } from './list'

export const columns = [
    { field: 'serialNo', headerName: '#', flex: 1, minWidth: 70 },
    { field: 'billDate', headerName: 'Invoice Date', minWidth: 120, flex: 1 },
    { field: 'billNo', headerName: 'Bill Number', minWidth: 120, flex: 1 },
    { field: 'cementCompany', headerName: 'Company Name', minWidth: 150, flex: 1 },
    { field: 'amount', headerName: 'Amount', minWidth: 100, flex: 1 },
    { field: 'submissionDate', headerName: 'Submission Date', minWidth: 180, flex: 1 },
    { field: 'action', headerName: 'Action', minWidth: 150, flex: 1 }
]

export const gridContent = (gridRows: billProps[]) => {
    return gridRows.map((bills: billProps, index) => {
        return {
            serialNo: index + 1,
            id: bills.id,
            billNo: bills.billNo,
            billDate: epochToMinimalDate(bills.billDate),
            cementCompany: bills.cementCompany.name,
            amount: bills.amount
        }
    })
}
