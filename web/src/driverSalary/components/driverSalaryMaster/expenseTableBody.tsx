import { Button, TableCell, TableRow } from '@mui/material'
import { createExpense } from '../../services/expenses'
import { expenseDetailsType } from './addExpenses'
import { ReactElement } from 'react'

export const tableHeadRow = (
    <TableRow>
        <TableCell sx={{ fontWeight: 700 }}>Expense Type</TableCell>
        <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
    </TableRow>
)
type expenseType = (
    expenseDetails: expenseDetailsType[],
    setExpenses: React.Dispatch<React.SetStateAction<expenseDetailsType[]>>,
    setClear: React.Dispatch<React.SetStateAction<boolean>>,
    clear: boolean
) => ReactElement
export const createExpenses: expenseType = (expenseDetails, setExpenses, setClear, clear) => {
    const handleCreateExpenses = async () => {
        if (await createExpense(expenseDetails)) {
            setExpenses([])
            setClear(!clear)
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'start' }}>
            <Button variant="contained" onClick={handleCreateExpenses}>
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
            <TableCell>{`\u20B9 ${expense.placedAmount}`}</TableCell>
        </TableRow>
    )
}
