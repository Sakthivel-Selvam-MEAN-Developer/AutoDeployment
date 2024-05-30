import { Paper, Table, Typography } from '@mui/material'
import { expenseDetailsType } from './addExpenses.tsx'
import { createExpenses } from './expenseTableBody.tsx'
import { tableBody } from './expenseTableRow.tsx'
import { FC } from 'react'
interface props {
    expenses: expenseDetailsType[]
    setDetails: React.Dispatch<React.SetStateAction<expenseDetailsType[]>>
    setClear: React.Dispatch<React.SetStateAction<boolean>>
    setMessage: React.Dispatch<React.SetStateAction<string>>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    clear: boolean
}
export const ExpenseTable: FC<props> = ({
    expenses,
    setDetails,
    setClear,
    setMessage,
    clear,
    setOpen
}) => {
    return (
        <>
            <br />
            {table(expenses)}
            <br />
            {createExpenses(expenses, setDetails, setClear, clear, setOpen, setMessage)}
        </>
    )
}
function table(expenseDetails: expenseDetailsType[]) {
    return (
        <>
            <Typography sx={{ marginBottom: '20px', fontWeight: 700 }}>Expense Details</Typography>
            <Table sx={{ width: 700 }} component={Paper} aria-label="simple table">
                {tableBody(expenseDetails)}
            </Table>
        </>
    )
}
