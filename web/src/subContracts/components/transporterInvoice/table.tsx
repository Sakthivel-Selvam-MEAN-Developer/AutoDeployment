import { TableContainer, Paper, Table, TableRow } from '@mui/material'
import { FC } from 'react'
import { StockTripTableProps, TableConatinerProps, tripDetailProps } from './type'
import { GetCells } from './tableCells'
import { GetTableHead } from './tableHead'
export const TripTable: FC<StockTripTableProps> = ({ trip, setTripDetails, tableName }) => {
    return (
        <>
            {trip.length !== 0 && (
                <div style={{ width: '100%' }}>
                    <p>
                        <b>{tableName}</b>
                    </p>
                    <TableContainer sx={{ maxHeight: 340 }} component={Paper}>
                        <TableConatiner trips={trip} setTripDetails={setTripDetails} />
                    </TableContainer>
                </div>
            )}
        </>
    )
}
const getTripType = (row: tripDetailProps) => {
    if (row.loadingPointToUnloadingPointTrip !== null) {
        return { trip: row.loadingPointToUnloadingPointTrip, id: row.id }
    }
    return getStockTrip(row)
}
const getStockTrip = (row: tripDetailProps) => {
    if (row.loadingPointToStockPointTrip !== null)
        return { trip: row.loadingPointToStockPointTrip, id: row.id }
}
export const TableConatiner: FC<TableConatinerProps> = ({ trips, setTripDetails }) => {
    return (
        <Table stickyHeader aria-label="sticky table">
            <GetTableHead />
            {trips.map((data, index) => {
                const { trip, id } = getTripType(data) || {
                    trip: undefined,
                    id: 0
                }
                return (
                    <TableRow key={index}>
                        <GetCells
                            trip={trip}
                            id={id}
                            overallTrip={trips}
                            setTripDetails={setTripDetails}
                        />
                    </TableRow>
                )
            })}
        </Table>
    )
}
