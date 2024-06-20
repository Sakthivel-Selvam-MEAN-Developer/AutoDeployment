import { TableCell } from '@mui/material'
import { FC } from 'react'
import { cellProps, unloadingProps } from './tableBodyTypes'

export const FreightUnloadingCells: FC<cellProps> = ({
    trip,
    type,
    editStatus,
    transporterPercentage
}) => {
    return (
        <>
            <UnloadingPoint trip={trip} type={type} />
            {!editStatus && <TableCell>{trip.freightAmount}</TableCell>}
            {!editStatus && <TableCell>{transporterPercentage}</TableCell>}
        </>
    )
}
const UnloadingPoint: FC<unloadingProps> = ({ trip, type }) => (
    <TableCell>{type === 'stock' ? trip.stockPoint.name : trip.unloadingPoint.name}</TableCell>
)
