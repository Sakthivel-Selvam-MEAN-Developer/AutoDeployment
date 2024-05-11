import { TableHead, TableRow, TableCell } from '@mui/material'
import { FC } from 'react'

const cellNames = [
    '#',
    'Vehicle Number',
    'Start Date',
    'Loading Point',
    'Invoice Number',
    'Transporter Name',
    'CSM Name',
    'Transporter Invoice',
    'Action'
]
export const GetTableHead: FC = () => {
    return (
        <TableHead>
            <TableRow>
                {cellNames.map((name, index) => (
                    <TableCell key={index} style={{ fontWeight: 'bold' }}>
                        {name}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
