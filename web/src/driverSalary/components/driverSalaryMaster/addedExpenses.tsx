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
            <p>
                <b>Added Expenses</b>
            </p>
            {table(addedExpense)}
            <br />
        </>
    )
}
function table(addedExpense: expenseDetailsType[]) {
    return (
        <Table sx={{ width: 650 }} component={Paper} aria-label="simple table">
            {tabelHeadRow}
            {addedExpense.map((expense: expenseDetailsType, index: number) =>
                tableBodyRow(expense, index)
            )}
        </Table>
    )
}

function tableBodyRow(expense: expenseDetailsType, index: number) {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
            <TableCell>{expense.expenseType}</TableCell>
            <TableCell>{expense.placedAmount}</TableCell>
        </TableRow>
    )
}
