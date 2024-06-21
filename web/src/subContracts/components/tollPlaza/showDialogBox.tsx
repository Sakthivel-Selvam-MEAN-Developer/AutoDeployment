import { Table, TableHead, TableRow, TableCell, TableBody, DialogContent } from '@mui/material'
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
                <TableCell>Action</TableCell>
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
                </TableRow>
            ))}
        </TableBody>
    )
}
