import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { billProps } from './list'

export const columns = [
    { field: 'id', headerName: '#', flex: 1, minWidth: 100 },
    { field: 'billNo', headerName: 'Bill Number', width: 150, flex: 1 },
    { field: 'billDate', headerName: 'Date Created', width: 150, flex: 1 },
    { field: 'cementCompany', headerName: 'Company Name', width: 200, flex: 1 },
    { field: 'amount', headerName: 'Amount', width: 150, flex: 1 },
    { field: 'submissionDate', headerName: 'Submission Date', width: 150, flex: 1 },
    { field: 'action', headerName: 'Action', width: 150, flex: 1 }
]

export const gridContent = (gridRows: billProps[]) => {
    return gridRows.map((trip: billProps) => {
        return {
            id: 1,
            billNo: trip.billNo,
            billDate: epochToMinimalDate(trip.billDate),
            cementCompany: trip.cementCompany.name,
            amount: trip.amount
        }
    })
}
