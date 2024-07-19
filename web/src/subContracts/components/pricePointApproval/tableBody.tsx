import { FC, useEffect, useState } from 'react'
import { overallTrip } from './types'
import { TableCell, TableRow } from '@mui/material'
import { TableFields } from './tableFields'
import { TableConatinerProps } from './tableBodyTypes'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { getPricePoint } from '../../services/pricePoint'
import { FreightUnloadingCells } from './FreightUnloadingCells'
const findTrip = (overallTrip: overallTrip) => {
    if (overallTrip.loadingPointToStockPointTrip !== null) {
        return { trip: overallTrip.loadingPointToStockPointTrip, type: 'stock' }
    } else {
        return { trip: overallTrip.loadingPointToUnloadingPointTrip, type: 'direct' }
    }
}
export const TableCellsConatiner: FC<TableConatinerProps> = ({ overallTrip }) => {
    const { trip, type } = findTrip(overallTrip)
    const [editStatus, setEditStatus] = useState(false)
    const [transporterPercentage, setTransporterPercentage] = useState(0)
    useEffect(() => {
        getPricePoint(trip.loadingPointId, trip.unloadingPointId, trip.stockPointId).then((data) =>
            setTransporterPercentage(data.transporterPercentage)
        )
    }, [trip, overallTrip])
    return (
        <TableRow>
            <TableCell>{overallTrip.truck.vehicleNumber}</TableCell>
            <TableCell>{epochToMinimalDate(trip.startDate)}</TableCell>
            <TableCell>{trip.invoiceNumber}</TableCell>
            <TableCell>{overallTrip.truck.transporter.name}</TableCell>
            <TableCell>{overallTrip.truck.transporter.employee?.name || null}</TableCell>
            <TableCell>{trip.loadingPoint.name}</TableCell>
            <FreightUnloadingCells
                trip={trip}
                type={type}
                editStatus={editStatus}
                transporterPercentage={transporterPercentage}
            />
            {transporterPercentage !== 0 && (
                <TableFields
                    freightRate={{ freight: trip.freightAmount, id: overallTrip.id }}
                    editStatus={editStatus}
                    setEditStatus={setEditStatus}
                    transporterPercentage={transporterPercentage}
                />
            )}
        </TableRow>
    )
}
