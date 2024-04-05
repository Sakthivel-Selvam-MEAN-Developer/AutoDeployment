import { Paper, Table, TableCell, TableRow } from '@mui/material'
import { expenseDetailsType } from './addExpenses.tsx'
const tabelHeadRow = (
    <TableRow>
        <TableCell>Expense Type</TableCell>
        <TableCell>Amount</TableCell>
    </TableRow>
)
export const AddedExpense = ({ addedExpense }: { addedExpense: expenseDetailsType[] }) => {
    return (
        <>
            {table(addedExpense)}
            <br />
        </>
    )
}
function table(addedExpense: expenseDetailsType[]) {
    return (
        <Table sx={{ width: 650 }} component={Paper} aria-label="simple table">
            <b>Added Expenses</b>
            <br />
            {tabelHeadRow}
            {addedExpense.map((expense: expenseDetailsType) => tableBodyRow(expense))}
        </Table>
    )
}

function tableBodyRow(expense: expenseDetailsType) {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>{expense.expenseType}</TableCell>
            <TableCell>{expense.amount}</TableCell>
        </TableRow>
    )
}
