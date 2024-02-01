import Table from '@mui/material/Table'
import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'

interface Row {
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    transporterBalance: number
    tripStatus: boolean
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
        }
    }
    endDate: number
    invoiceNumber: string
    loadingPoint: {
        name: string
    }
    unloadingPoint: {
        name: string
    }
    filledLoad: string
    startDate: number
}
interface Props {
    acknowledgementStatus: boolean
    loadingPointToStockPointTrip: Row
    loadingPointToUnloadingPointTrip: Row
}
interface listoverallTripProps {
    listoverallTrip: Props[]
}

function getTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Vehicle Number</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">Transporter</TableCell>
                <TableCell align="left">Loading Point</TableCell>
                <TableCell align="left">Freight Amount</TableCell>
                <TableCell align="left">Tansporter Amount</TableCell>
                <TableCell align="left">Total Freight Amount</TableCell>
                <TableCell align="left">Total Tansporter Amount</TableCell>
                <TableCell align="left">Trip Status</TableCell>
            </TableRow>
        </TableHead>
    )
}
const getCells = (data: Row, num: number) => {
    console.log(data)
    return (
        <>
            <TableCell> {num} </TableCell>
            <TableCell align="left">{data.truck.vehicleNumber}</TableCell>
            <TableCell align="left">{epochToMinimalDate(data.startDate)}</TableCell>
            <TableCell align="left">{data.truck.transporter.name}</TableCell>
            <TableCell align="left">{data.loadingPoint.name}</TableCell>
            <TableCell align="left">{data.freightAmount}</TableCell>
            <TableCell align="left">{data.transporterAmount}</TableCell>
            <TableCell align="left">{data.totalFreightAmount}</TableCell>
            <TableCell align="left">{data.totalTransporterAmount}</TableCell>
            <TableCell align="left">
                {data.tripStatus === false ? 'Running' : 'completed'}
            </TableCell>
        </>
    )
}
function getTableBody(allTrips: Props[]) {
    let number = 0
    return (
        <TableBody>
            {allTrips.map((row: Props, index) => {
                if (
                    row.loadingPointToStockPointTrip !== null &&
                    row.loadingPointToStockPointTrip !== undefined
                ) {
                    return (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {getCells(row.loadingPointToStockPointTrip, ++number)}
                        </TableRow>
                    )
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
                            {getCells(row.loadingPointToUnloadingPointTrip, ++number)}
                        </TableRow>
                    )
                }
            })}
        </TableBody>
    )
}
const ListAllDetails: React.FC<listoverallTripProps> = ({ listoverallTrip }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    {getTableHead()}
                    {getTableBody(listoverallTrip)}
                </Table>
            </TableContainer>
            <br />
            <br />
        </>
    )
}

export default ListAllDetails
