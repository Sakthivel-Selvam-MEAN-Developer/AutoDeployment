import { TableCell, TableRow } from '@mui/material'
import { FC } from 'react'

const tablehead = [
    'Vehicle Number',
    'StartDate',
    'Invoice Number',
    'Transporter',
    'Loading Point',
    'Unloading Point',
    'Unloaded Quantity',
    'Actions'
]
const center = { textAlign: 'center' }
export const TableHeadContainer: FC = () => {
    return (
        <TableRow>
            {tablehead.map((headName, index) => {
                return (
                    <TableCell key={index} sx={center}>
                        <b>{headName}</b>
                    </TableCell>
                )
            })}
        </TableRow>
    )
}
