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
    expenses: expenseDetailsType[],
    setDetails: React.Dispatch<React.SetStateAction<expenseDetailsType[]>>,
    setClear: React.Dispatch<React.SetStateAction<boolean>>,
    clear: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>
) => ReactElement
export const createExpenses: expenseType = (
    expenses,
    setDetails,
    setClear,
    clear,
    setOpen,
    setMessage
) => {
    const handleCreateExpenses = async () => {
        if (await createExpense(expenses)) {
            setDetails([])
            setClear(!clear)
            setMessage('Expenses Creation is Successfull')
            setOpen(true)
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
