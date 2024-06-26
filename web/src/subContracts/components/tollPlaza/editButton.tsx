import { TableRow, TableCell, TextField } from '@mui/material'
export function tableColumn(
    editMode: { [key: number]: boolean },
    toll: { id: number; tollPlazaLocation: { id: number; location: string }; amount: number },
    tollAmounts: { [key: number]: number },
    handleAmountChange: (id: number, newAmount: number) => void
) {
    return (
        <TableCell>
            {editMode[toll.tollPlazaLocation.id]
                ? amountChange(tollAmounts, toll, handleAmountChange)
                : tollAmounts[toll.tollPlazaLocation.id]}
        </TableCell>
    )
}
function amountChange(
    tollAmounts: { [key: number]: number },
    toll: { id: number; tollPlazaLocation: { id: number; location: string }; amount: number },
    handleAmountChange: (id: number, newAmount: number) => void
) {
    return (
        <TextField
            value={tollAmounts[toll.tollPlazaLocation.id]}
            onChange={(e) => handleAmountChange(toll.tollPlazaLocation.id, Number(e.target.value))}
            type="number"
        />
    )
}
export function listofColumns() {
    return (
        <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Edit</TableCell>
        </TableRow>
    )
}
