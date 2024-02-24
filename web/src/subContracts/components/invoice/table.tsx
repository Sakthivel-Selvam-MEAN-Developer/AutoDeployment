import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { tripDetailsProps } from './list'
import { stockToUnloadingProps } from './interface'

export const getTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>#</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">Invoice Number</TableCell>
                <TableCell align="left">Vehicle Number</TableCell>
                <TableCell align="left">Loading Point</TableCell>
                <TableCell align="left">Unloading Point</TableCell>
                <TableCell align="left">Freight Amount</TableCell>
                <TableCell align="left">Total Freight Amount</TableCell>
            </TableRow>
        </TableHead>
    )
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
export const getCells = (
    data: any,
    overallId: number,
    handleClick: (obj: tripDetailsProps) => void
) => {
    return (
        <>
            <TableCell
                key={`${data.unloadingPoint ? 'LoadingToUnloading' : 'LoadingToStock'}-${data.id}`}
            >
                <Checkbox
                    onClick={() => {
                        const obj = {
                            overallTripId: overallId,
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
    overallId: number,
    handleClick: (obj: tripDetailsProps) => void
) => {
    return (
        <>
            <TableCell key={`StockToUnloading-${data.id}`}>
                <Checkbox
                    onClick={() => {
                        const obj = {
                            overallTripId: overallId,
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
