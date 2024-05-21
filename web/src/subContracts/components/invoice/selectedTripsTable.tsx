import { Paper, Table, TableCell, TableContainer, TableRow } from '@mui/material'
import { tripDetails } from './list'
import { FC, useContext } from 'react'
import { partyNamesContext } from './invoiceContext'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { getSelectedTableHead } from './table'
interface SelectedTableProps {
    selectedTrip: tripDetails[]
}
const SelectedTableBody: FC<SelectedTableProps> = ({ selectedTrip }) => {
    return (
        <>
            {selectedTrip.map((data, index) => {
                return (
                    <TableRow key={index}>
                        <SelectedTableCells cells={data} />
                    </TableRow>
                )
            })}
        </>
    )
}
interface cellProps {
    cells: tripDetails
}
const SelectedTableCells: FC<cellProps> = ({ cells }) => {
    const { partyNames } = useContext(partyNamesContext)
    const partyName = partyNames.filter((trip) => trip.invoiceNumber === cells.invoiceNumber)
    return (
        <>
            <TableCell sx={{ textAlign: 'left' }}>{epochToMinimalDate(cells.startDate)}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{cells.invoiceNumber}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{cells.truck.vehicleNumber}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{cells.freightAmount}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{cells.totalFreightAmount}</TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{partyName[0].partyName}</TableCell>
        </>
    )
}
export const SelectedTableContainer: FC<SelectedTableProps> = ({ selectedTrip }) => {
    return (
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                {getSelectedTableHead()}
                <SelectedTableBody selectedTrip={selectedTrip} />
            </Table>
        </TableContainer>
    )
}
