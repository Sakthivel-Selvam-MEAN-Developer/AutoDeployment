import { FC } from 'react'
import { overallTripProps, tripDetailsProps } from '../../types/tripTypes'
import { TableCell, TableRow } from '@mui/material'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { TableFields } from './tableFields'

interface TableBodyContainer {
    overallTrip: overallTripProps
}
const findTripType = (trip: overallTripProps) => {
    return trip.loadingPointToStockPointTrip !== null
        ? trip.loadingPointToStockPointTrip
        : trip.loadingPointToUnloadingPointTrip
}
export const TableBodyContainer: FC<TableBodyContainer> = ({ overallTrip }) => {
    const trip = findTripType(overallTrip)
    return (
        <TableRow>
            <TableCells trip={trip} overallTrip={overallTrip} />
        </TableRow>
    )
}
interface TableCells {
    trip: tripDetailsProps | undefined
    overallTrip: overallTripProps
}
const center = { textAlign: 'center' }
const TableCells: FC<TableCells> = ({ trip, overallTrip }) => {
    const unloading =
        overallTrip.stockPointToUnloadingPointTrip !== null
            ? overallTrip.stockPointToUnloadingPointTrip.unloadingPoint?.name
            : overallTrip.loadingPointToUnloadingPointTrip.unloadingPoint?.name
    return (
        <>
            <TableCell sx={center}>{trip?.truck.vehicleNumber}</TableCell>
            <TableCell sx={center}>
                {trip !== undefined && epochToMinimalDate(trip.startDate)}
            </TableCell>
            <TableCell sx={center}>{trip?.invoiceNumber}</TableCell>
            <TableCell sx={center}>{trip?.truck.transporter.name}</TableCell>
            <TableCell sx={center}>{trip?.loadingPoint.name}</TableCell>
            <TableCell sx={center}>{unloading}</TableCell>
            <TableFields overallTrip={overallTrip} />
        </>
    )
}
