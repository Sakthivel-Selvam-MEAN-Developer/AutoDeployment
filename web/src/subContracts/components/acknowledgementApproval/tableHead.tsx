import { TableCell, TableHead, TableRow } from '@mui/material'
import { FC } from 'react'

const tablehead = [
    'Vehicle Number',
    'StartDate',
    'Invoice Number',
    'Transporter',
    'Loading Point',
    'Unloading Point',
    'Loaded Quantity',
    'Shortage Quantity',
    'Unloaded Quantity',
    'Approval type',
    'Actions'
]
const center = { textAlign: 'center' }
export const TableHeadContainer: FC = () => {
    return (
        <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
            <TableRow>
                {tablehead.map((headName, index) => {
                    return (
                        <TableCell key={index} sx={center}>
                            <b>{headName}</b>
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}
