import { TableCell, TableHead, TableRow } from '@mui/material'

const cellNames = [
    'Start Date',
    'Invoice Number',
    'Vehicle Number',
    'Loading Point',
    'Unloading Point',
    'Freight Amount',
    'Total Freight Amount'
]
const cells = (cell: string, index: number) => {
    return (
        <TableCell key={index} align="left">
            {cell}
        </TableCell>
    )
}
const newLocal = (
    <TableRow>
        <TableCell sx={{ textAlign: 'left' }}>#</TableCell>
        {cellNames.map((cellName, index) => cells(cellName, index))}
    </TableRow>
)

export const getTableHead = () => {
    return <TableHead>{newLocal}</TableHead>
}
