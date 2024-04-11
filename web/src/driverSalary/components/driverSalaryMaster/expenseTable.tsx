import { Paper, Table } from '@mui/material'
import { expenseDetailsType } from './addExpenses.tsx'
import { createExpenses, tableBody } from './expenseTableBody.tsx'

export const ExpenseTable = ({ expenseDetails }: { expenseDetails: expenseDetailsType[] }) => {
    return (
        <>
            <br />
            {table(expenseDetails)}
            <br />
            {createExpenses(expenseDetails)}
        </>
    )
}
function table(expenseDetails: expenseDetailsType[]) {
    return (
        <Table sx={{ width: 650 }} component={Paper} aria-label="simple table">
            <b>Expenses Details</b>
            {tableBody(expenseDetails)}
        </Table>
    )
}
