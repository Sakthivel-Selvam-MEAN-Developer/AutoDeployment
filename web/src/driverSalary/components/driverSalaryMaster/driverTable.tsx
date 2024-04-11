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
import { FC, ReactElement } from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
export interface driverDialogProps {
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
    driverTripDetails: tripProps[]
}
export interface tripProps {
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

const cellNames = [
    'S.No',
    'Date',
    'From',
    'Invoice Number',
    'Expenses Amount',
    'Trip Betta',
    'Advance Amount',
    'Trip Salary',
    'Download'
]

const tableRow = (
    <TableRow>
        {cellNames.map((cell) => (
            <TableCell align="center">{cell}</TableCell>
        ))}
    </TableRow>
)
const tableHead = <TableHead>{tableRow}</TableHead>
const Driver_Table: FC<driverDialogProps> = ({ driverTripDetails, setActivateDialog }) => {
    return (
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {tableHead}
                {tableBody(driverTripDetails, setActivateDialog)}
            </Table>
        </TableContainer>
    )
}

export default Driver_Table

const getTrip = (trip: tripProps) => {
    return isLoadingToStock(trip)
        ? trip.loadingPointToStockPointTrip
        : trip.loadingPointToUnloadingPointTrip
}

const buttonCell = (setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>) => {
    return (
        <TableCell align="center">
            <Button onClick={() => setActivateDialog(true)}>
                <DownloadIcon />
            </Button>
        </TableCell>
    )
}
const driverDetailsCell = (trip: tripDetailProps) => {
    return (
        <>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">{epochToMinimalDate(trip.startDate)}</TableCell>
            <TableCell align="center">{trip.loadingPoint.name}</TableCell>
            <TableCell align="center">{trip.invoiceNumber}</TableCell>
        </>
    )
}
const driverAmountCells = (
    <>
        <TableCell align="center">{'\u20B9'} 2349</TableCell>
        <TableCell align="center">{'\u20B9'} 6490</TableCell>
        <TableCell align="center">{'\u20B9'} 5460</TableCell>
        <TableCell align="center">{'\u20B9'} 13456</TableCell>
    </>
)
type rowType = (
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>,
    trip: tripDetailProps
) => ReactElement
const getRow: rowType = (setActivateDialog, trip) => {
    return (
        <TableRow>
            {driverDetailsCell(trip)}
            {driverAmountCells}
            {buttonCell(setActivateDialog)}
        </TableRow>
    )
}
type tableBody = (
    driverTripDetails: tripProps[],
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
) => ReactElement
const tableBody: tableBody = (driverTripDetails, setActivateDialog) => {
    return (
        <TableBody>
            {driverTripDetails &&
                driverTripDetails.map((trip: tripProps) => {
                    return getRow(setActivateDialog, getTrip(trip))
                })}
        </TableBody>
    )
}

function isLoadingToStock(trip: tripProps) {
    return (
        trip.loadingPointToStockPointTrip !== null &&
        trip.loadingPointToStockPointTrip !== undefined
    )
}
