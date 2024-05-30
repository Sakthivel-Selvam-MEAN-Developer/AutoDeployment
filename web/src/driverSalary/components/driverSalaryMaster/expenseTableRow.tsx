import { TableRow, TableCell } from '@mui/material'
import { expenseDetailsType } from './addExpenses'
import { tableHeadRow } from './expenseTableBody'

export const tableBody = (expenseDetails: expenseDetailsType[]) => {
    return (
        <>
            {tableHeadRow}
            {expenseDetails.map((expense: expenseDetailsType) => {
                return tableBodyRow(expense)
            })}
        </>
    )
}
export const tableBodyRow = (expense: expenseDetailsType) => {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>{expense.expenseType}</TableCell>
            <TableCell>{`\u20B9 ${expense.placedAmount}`}</TableCell>
        </TableRow>
    )
}
