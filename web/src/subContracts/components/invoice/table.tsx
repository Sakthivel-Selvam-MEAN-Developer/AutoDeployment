import { TableCell, TableHead, TableRow } from '@mui/material'

const cellNames = [
    'Start Date',
    'Invoice Number',
    'Vehicle Number',
    'Loading Point',
    'Unloading Point',
    'Freight Amount',
    'Total Freight Amount',
    'Action'
]
const cells = (cell: string, index: number) => {
    return (
        <TableCell key={index} align="left">
            {cell}
        </TableCell>
    )
}
const newLocal = <TableRow>{cellNames.map((cellName, index) => cells(cellName, index))}</TableRow>

export const getTableHead = () => {
    return <TableHead>{newLocal}</TableHead>
}
const selectedCellNames = [
    'Start Date',
    'Invoice Number',
    'Vehicle Number',
    'Freight Amount',
    'Total Freight Amount'
]

export const getSelectedTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                {selectedCellNames.map((cellName, index) => (
                    <TableCell key={index} align="left">
                        {cellName}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
