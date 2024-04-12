import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { tripDetailsProps } from './list'
import { stockToUnloadingProps } from './interface'

const cellNames = [
    'Start Date',
    'Invoice Number',
    'Vehicle Number',
    'Loading Point',
    'Unloading Point',
    'Freight Amount',
    'Total Freight Amount'
]
const cells = (cell: string, index: number) => {
    return (
        <TableCell key={index} align="center">
            {cell}
        </TableCell>
    )
}
const newLocal = (
    <TableRow>
        <TableCell sx={{ textAlign: 'center' }}>#</TableCell>
        {cellNames.map((cellName, index) => cells(cellName, index))}
    </TableRow>
)

export const getTableHead = () => {
    return <TableHead>{newLocal}</TableHead>
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
export const getCells = (data: any, handleClick: (obj: tripDetailsProps) => void) => {
    return (
        <>
            <TableCell
                key={`${data.unloadingPoint ? 'LoadingToUnloading' : 'LoadingToStock'}-${data.id}`}
                sx={{ textAlign: 'center' }}
            >
                <Checkbox
                    onClick={() => {
                        const obj = {
                            tripId: data.id,
                            tripName: data.unloadingPoint ? 'LoadingToUnloading' : 'LoadingToStock'
                        }
                        handleClick(obj)
                    }}
                    {...label}
                />
            </TableCell>
            <TableCell>{epochToMinimalDate(data.startDate)}</TableCell>
            <TableCell>{data.invoiceNumber}</TableCell>
            <TableCell>{data.truck.vehicleNumber}</TableCell>
            <TableCell>
                {data.loadingPoint ? data.loadingPoint.name : data.stockPoint.name}
            </TableCell>
            <TableCell>
                {data.unloadingPoint ? data.unloadingPoint.name : data.stockPoint.name}
            </TableCell>
            <TableCell>{data.transporterAmount}</TableCell>
            <TableCell>{data.totalFreightAmount}</TableCell>
        </>
    )
}
export const getCellsByStockToUnloading = (
    data: stockToUnloadingProps,
    handleClick: (obj: tripDetailsProps) => void
) => {
    return (
        <>
            <TableCell key={`StockToUnloading-${data.id}`} sx={{ textAlign: 'center' }}>
                <Checkbox
                    onClick={() => {
                        const obj = {
                            tripId: data.id,
                            tripName: 'StockToUnloading'
                        }
                        handleClick(obj)
                    }}
                    {...label}
                />
            </TableCell>
            <TableCell>{epochToMinimalDate(data.startDate)}</TableCell>
            <TableCell>{data.invoiceNumber}</TableCell>
            <TableCell>{data.loadingPointToStockPointTrip.truck.vehicleNumber}</TableCell>
            <TableCell>{data.loadingPointToStockPointTrip.stockPoint.name}</TableCell>
            <TableCell>{data.unloadingPoint.name}</TableCell>
            <TableCell>{data.transporterAmount}</TableCell>
            <TableCell>{data.totalFreightAmount}</TableCell>
        </>
    )
}
