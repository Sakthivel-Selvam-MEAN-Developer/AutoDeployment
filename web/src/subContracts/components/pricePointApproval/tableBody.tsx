import { FC, useState } from 'react'
import { overallTrip } from './types'
import { TableCell, TableRow } from '@mui/material'
import { TableFields } from './tableFields'
import { cellProps, FreightAndUnloadingProps, unloadingProps } from './tableBodyTypes'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
const findTrip = (overallTrip: overallTrip) => {
    if (overallTrip.loadingPointToStockPointTrip !== null) {
        return { trip: overallTrip.loadingPointToStockPointTrip, type: 'stock' }
    } else {
        return { trip: overallTrip.loadingPointToUnloadingPointTrip, type: 'direct' }
    }
}
export const TableCellsConatiner: FC<cellProps> = ({ overallTrip }) => {
    const { trip, type } = findTrip(overallTrip)
    const [editStatus, setEditStatus] = useState(false)
    return (
        <TableRow>
            <TableCell>{trip.truck.vehicleNumber}</TableCell>
            <TableCell>{epochToMinimalDate(trip.startDate)}</TableCell>
            <TableCell>{trip.invoiceNumber}</TableCell>
            <TableCell>{trip.truck.transporter.name}</TableCell>
            <TableCell>{trip.truck.transporter.csmName}</TableCell>
            <TableCell>{trip.loadingPoint.name}</TableCell>
            <FreightAndUnloadingPoint trip={trip} type={type} editStatus={editStatus} />
            <TableFields
                freightRate={{ freight: trip.freightAmount, id: overallTrip.id }}
                editStatus={editStatus}
                setEditStatus={setEditStatus}
            />
        </TableRow>
    )
}
const FreightAndUnloadingPoint: FC<FreightAndUnloadingProps> = ({ trip, type, editStatus }) => {
    return (
        <>
            <UnloadingPoint trip={trip} type={type} />
            {!editStatus && <TableCell>{trip.freightAmount}</TableCell>}
        </>
    )
}
const UnloadingPoint: FC<unloadingProps> = ({ trip, type }) => (
    <TableCell>{type === 'stock' ? trip.stockPoint.name : trip.unloadingPoint.name}</TableCell>
)
