import { Paper, Table } from '@mui/material'
import { expenseDetailsType } from './addExpenses.tsx'
import { createExpenses, tableBody } from './expenseTableBody.tsx'
interface expenseTableProps {
    expenseDetails: expenseDetailsType[]
    setExpensesDetails: React.Dispatch<React.SetStateAction<expenseDetailsType[]>>
    setClear: React.Dispatch<React.SetStateAction<boolean>>
    clear: boolean
}
export const ExpenseTable: React.FC<expenseTableProps> = ({
    expenseDetails,
    setExpensesDetails,
    setClear,
    clear
}) => {
    return (
        <>
            <br />
            {table(expenseDetails)}
            <br />
            {createExpenses(expenseDetails, setExpensesDetails, setClear, clear)}
        </>
    )
}
function table(expenseDetails: expenseDetailsType[]) {
    return (
        <>
            <p>
                <b>Expenses Details</b>
            </p>
            <Table sx={{ width: 700 }} component={Paper} aria-label="simple table">
                {tableBody(expenseDetails)}
            </Table>
        </>
    )
}
