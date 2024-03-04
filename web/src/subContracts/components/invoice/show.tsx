import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { getCells, getCellsByStockToUnloading, getTableHead } from './table'
import { TableBody, TableRow } from '@mui/material'
import { tripDetailsProps } from './list'
import { FC } from 'react'
import { tripDetailProps } from './interface'
interface tripProps {
    tripDetails: tripDetailProps[]
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps[]>>
    tripId: tripDetailsProps[]
}

const ListAllTripForInvoice: FC<tripProps> = ({ tripDetails, setTripId, tripId }) => {
    const handleClick = (obj: tripDetailsProps) => {
        if (
            tripId.find(
                (detail) => detail.tripId === obj.tripId && detail.tripName === obj.tripName
            )
        )
            setTripId(
                tripId.filter(
                    (detail) => !(detail.tripId === obj.tripId && detail.tripName === obj.tripName)
                )
            )
        else setTripId((prev: tripDetailsProps[]) => [...prev, obj])
    }
    return (
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                {getTableHead()}
                <TableBody>
                    {tripDetails &&
                        tripDetails.map((row: tripDetailProps, index: number) => {
                            if (
                                row.stockPointToUnloadingPointTrip !== null &&
                                row.stockPointToUnloadingPointTrip !== undefined
                            ) {
                                return loadingToStockTable(index, row, handleClick)
                            }
                            if (
                                row.loadingPointToUnloadingPointTrip !== null &&
                                row.loadingPointToUnloadingPointTrip !== undefined
                            ) {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {getCells(
                                            row.loadingPointToUnloadingPointTrip,
                                            handleClick
                                        )}
                                    </TableRow>
                                )
                            }
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default ListAllTripForInvoice
function loadingToStockTable(
    index: number,
    row: tripDetailProps,
    handleClick: (obj: tripDetailsProps) => void
) {
    return (
        <>
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {getCells(
                    row.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip,
                    handleClick
                )}
            </TableRow>
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {getCellsByStockToUnloading(row.stockPointToUnloadingPointTrip, handleClick)}
            </TableRow>
        </>
    )
}
