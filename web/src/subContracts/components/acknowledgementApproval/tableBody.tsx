import { FC } from 'react'
import { overallTripProps, tripDetailsProps } from '../../types/tripTypes'
import { TableCell, TableRow } from '@mui/material'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { TableFields } from './tableFields'

interface TableBodyContainer {
    overallTrip: overallTripProps
    setSendStatus: React.Dispatch<React.SetStateAction<boolean>>
}
const findTripType = (trip: overallTripProps) => {
    return trip.loadingPointToStockPointTrip !== null
        ? trip.loadingPointToStockPointTrip
        : trip.loadingPointToUnloadingPointTrip
}
export const TableBodyContainer: FC<TableBodyContainer> = ({ overallTrip, setSendStatus }) => {
    const trip = findTripType(overallTrip)
    return (
        <TableRow>
            <TableCells trip={trip} overallTrip={overallTrip} setSendStatus={setSendStatus} />
        </TableRow>
    )
}
interface TableCells {
    trip: tripDetailsProps | undefined
    overallTrip: overallTripProps
    setSendStatus: React.Dispatch<React.SetStateAction<boolean>>
}
const center = { textAlign: 'center' }
const unloadingPoint = (overallTrip: overallTripProps) => {
    return overallTrip.stockPointToUnloadingPointTrip !== null
        ? overallTrip.stockPointToUnloadingPointTrip.unloadingPoint?.name
        : overallTrip.loadingPointToUnloadingPointTrip.unloadingPoint?.name
}
const TableCells: FC<TableCells> = ({ trip, overallTrip, setSendStatus }) => {
    return (
        <>
            <TableCell sx={center}>{trip?.truck.vehicleNumber}</TableCell>
            <TableCell sx={center}>
                {trip !== undefined && epochToMinimalDate(trip.startDate)}
            </TableCell>
            <TableCell sx={center}>{trip?.invoiceNumber}</TableCell>
            <TableCell sx={center}>{trip?.truck.transporter.name}</TableCell>
            <TableCell sx={center}>{trip?.loadingPoint.name}</TableCell>
            <TableCell sx={center}>{unloadingPoint(overallTrip)}</TableCell>
            <TableFields overallTrip={overallTrip} setSendStatus={setSendStatus} />
        </>
    )
}
