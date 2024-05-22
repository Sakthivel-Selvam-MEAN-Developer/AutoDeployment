import { TableCell } from '@mui/material'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { tripDetails } from './list'
import { partyNamesContext } from './invoiceContext'
import { FC, useContext } from 'react'
import { cellProps } from './interface'

export const SelectedTableCells: FC<cellProps> = ({ cells }: { cells: tripDetails }) => {
    const { partyNames } = useContext(partyNamesContext)
    const partyName = partyNames.filter((trip) => trip.invoiceNumber === cells.invoiceNumber)
    return (
        <>
            <TableCell sx={{ textAlign: 'left' }}>{epochToMinimalDate(cells.startDate)}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{cells.invoiceNumber}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{cells.truck.vehicleNumber}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{cells.freightAmount}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{cells.totalFreightAmount}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>
                {partyNames.length > 0 ? partyName[0].partyName : ''}
            </TableCell>
        </>
    )
}
