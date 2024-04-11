import { Button, TableCell, TableRow } from '@mui/material'
import { createExpense } from '../../services/expenses'
import { expenseDetailsType } from './addExpenses'

export const tableHeadRow = (
    <TableRow>
        <TableCell>Expense Type</TableCell>
        <TableCell>Amount</TableCell>
    </TableRow>
)
export const createExpenses = (expenseDetails: expenseDetailsType[]) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={() => createExpense(expenseDetails)}>
                Create Expense
            </Button>
        </div>
    )
}
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
            <TableCell>{expense.amount}</TableCell>
        </TableRow>
    )
}
