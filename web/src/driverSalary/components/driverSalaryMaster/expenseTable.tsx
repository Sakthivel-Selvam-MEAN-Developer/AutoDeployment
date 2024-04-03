import { Button, Paper, Table, TableCell, TableRow } from '@mui/material'
import { createExpense } from '../../services/expenses.ts'
import { expenseDetailsType } from './addExpenses.tsx'
export const ExpenseTable = ({ expenseDetails }: { expenseDetails: expenseDetailsType[] }) => {
    return (
        <>
            <br />
            <br />
            <Table sx={{ width: 650 }} component={Paper} aria-label="simple table">
                <b>Expenses Details</b>
                <br />
                <TableRow>
                    <TableCell>Expense Type</TableCell>
                    <TableCell>Amount</TableCell>
                </TableRow>
                {expenseDetails.map((expense: expenseDetailsType) => {
                    return (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{expense.expenseType}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                        </TableRow>
                    )
                })}
            </Table>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={() => createExpense(expenseDetails)}>
                    Create Expense
                </Button>
            </div>
        </>
    )
}
