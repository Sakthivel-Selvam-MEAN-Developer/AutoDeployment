import { FC } from 'react'
import { overallTripProps } from '../../types/tripTypes'
import { TableRow } from '@mui/material'
import { TableCells } from './tableBodyUtils'

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
