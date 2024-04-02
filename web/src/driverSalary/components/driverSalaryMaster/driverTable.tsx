import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button
} from '@mui/material'
import { FC } from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
export interface driverDialogProps {
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
    driverTripDetails: tripProps[]
}
interface tripProps {
    loadingPointToUnloadingPointTrip: tripDetailProps
    loadingPointToStockPointTrip: tripDetailProps
}
interface tripDetailProps {
    startDate: number
    loadingPoint: {
        name: string
    }
    invoiceNumber: string
}
const Driver_Table: FC<driverDialogProps> = ({ driverTripDetails, setActivateDialog }) => {
    return (
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">S.No</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">From </TableCell>
                        <TableCell align="center">Invoice Number</TableCell>
                        <TableCell align="center">Expenses Amount</TableCell>
                        <TableCell align="center">Trip Betta</TableCell>
                        <TableCell align="center">Advance Amount</TableCell>
                        <TableCell align="center">Trip Salary</TableCell>
                        <TableCell align="center">Download</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {driverTripDetails &&
                        driverTripDetails.map((trip: tripProps) => {
                            return getRow(
                                setActivateDialog,
                                isLoadingToStock(trip)
                                    ? trip.loadingPointToStockPointTrip
                                    : trip.loadingPointToUnloadingPointTrip
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Driver_Table

function getRow(
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>,
    trip: tripDetailProps
) {
    return (
        <TableRow>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">{epochToMinimalDate(trip.startDate)}</TableCell>
            <TableCell align="center">{trip.loadingPoint.name}</TableCell>
            <TableCell align="center">{trip.invoiceNumber}</TableCell>
            <TableCell align="center">{'\u20B9'} 2349</TableCell>
            <TableCell align="center">{'\u20B9'} 6490</TableCell>
            <TableCell align="center">{'\u20B9'} 5460</TableCell>
            <TableCell align="center">{'\u20B9'} 13456</TableCell>
            <TableCell align="center">
                {
                    <Button onClick={() => setActivateDialog(true)}>
                        <DownloadIcon />
                    </Button>
                }
            </TableCell>
        </TableRow>
    )
}

function isLoadingToStock(trip: tripProps) {
    return (
        trip.loadingPointToStockPointTrip !== null &&
        trip.loadingPointToStockPointTrip !== undefined
    )
}
