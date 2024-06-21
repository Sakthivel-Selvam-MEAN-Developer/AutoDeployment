import { Table, TableHead, TableRow, TableCell, TableBody, DialogContent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
export function showDialogBox(
    selectedToll:
        | { tollPlazaLocation: { id: number; location: string }; amount: number }[]
        | undefined
) {
    return (
        <DialogContent>
            <Table>
                {header()}
                {dialogBody(selectedToll)}
            </Table>
        </DialogContent>
    )
}
const header = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
            </TableRow>
        </TableHead>
    )
}
const dialogBody = (
    selectedToll:
        | { tollPlazaLocation: { id: number; location: string }; amount: number }[]
        | undefined
) => {
    return (
        <TableBody>
            {selectedToll?.map((toll) => (
                <TableRow key={toll.tollPlazaLocation.id}>
                    <TableCell>{toll.tollPlazaLocation.location}</TableCell>
                    <TableCell>{toll.amount}</TableCell>
                    <TableCell>
                        <EditIcon />
                    </TableCell>
                    <TableCell>
                        <DeleteIcon />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}
