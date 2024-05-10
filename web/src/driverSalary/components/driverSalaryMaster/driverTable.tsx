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
import { expensesProps, tripSalaryProps } from './driverDetails'
export interface driverDialogProps {
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
    driverTrips: tripProps[]
    expenses: expensesProps[]
}
export interface tripProps {
    id: number
    loadingPointToUnloadingPointTrip: tripDetailProps | null
    loadingPointToStockPointTrip: loadingPointToStockPointTripProps | null
    tripSalaryDeatails: tripSalaryProps
}
interface tripDetailProps {
    startDate: number
    invoiceNumber: string
    loadingPoint: { name: string }
    unloadingPoint?: { name: string }
}
interface loadingPointToStockPointTripProps {
    id: number
    startDate: number
    invoiceNumber: string
    loadingPoint: { name: string }
    stockPointToUnloadingPointTrip: [{ unloadingPoint: { name: string } }]
}
interface getTripProps {
    tripDetails: tripDetailProps | loadingPointToStockPointTripProps | null
    unloadingPoint: string | undefined
    tripSalaryDetails: tripSalaryProps
}
const cellNames = [
    'S.No',
    'Date',
    'Trip Route',
    'Invoice Number',
    'Expenses Amount',
    'Trip Betta',
    'Advance Amount',
    'Trip Salary',
    'Download'
]

const cells = (cell: string, index: number) => {
    return (
        <TableCell key={index} align="center">
            {cell}
        </TableCell>
    )
}
const tableRow = <TableRow>{cellNames.map((cell, index) => cells(cell, index))}</TableRow>
const tableHead = <TableHead>{tableRow}</TableHead>
const DriverTable: FC<driverDialogProps> = ({ setActivateDialog, driverTrips, expenses }) => {
    return (
        <>
            {driverTrips.length !== 0 ? (
                <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        {tableHead}
                        {tableBody(setActivateDialog, driverTrips, expenses)}
                    </Table>
                </TableContainer>
            ) : (
                <p>Select Driver to Display Trips ..!</p>
            )}
        </>
    )
}

export default DriverTable

const getTrip = (trip: tripProps) => {
    if (isLoadingToStock(trip)) {
        return {
            tripDetails: trip.loadingPointToStockPointTrip,
            tripSalaryDetails: trip.tripSalaryDeatails,
            unloadingPoint: trip.loadingPointToStockPointTrip?.stockPointToUnloadingPointTrip.length
                ? trip.loadingPointToStockPointTrip?.stockPointToUnloadingPointTrip[0]
                      .unloadingPoint.name
                : 'Not Yet'
        }
    } else {
        return {
            tripDetails: trip.loadingPointToUnloadingPointTrip,
            tripSalaryDetails: trip.tripSalaryDeatails,
            unloadingPoint: trip.loadingPointToUnloadingPointTrip?.unloadingPoint?.name
        }
    }
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
const tripDetailsCell = (trip: getTripProps, index: number) => {
    return (
        <>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">
                {trip.tripDetails?.startDate && epochToMinimalDate(trip.tripDetails?.startDate)}
            </TableCell>
            <TableCell align="center">{`${trip.tripDetails?.loadingPoint.name} - ${trip.unloadingPoint}`}</TableCell>
            <TableCell align="center">{trip.tripDetails?.invoiceNumber}</TableCell>
        </>
    )
}
const driverAmountCells = (totalExpenseAmount: number, tripSalaryDeatails: tripSalaryProps) => {
    return (
        <>
            <TableCell align="center">
                {'\u20B9'} {totalExpenseAmount}
            </TableCell>
            <TableCell align="center">
                {'\u20B9'} {tripSalaryDeatails.totalTripBetta}
            </TableCell>
            <TableCell align="center">
                {'\u20B9'} {tripSalaryDeatails.totalDriverAdvance}
            </TableCell>
            <TableCell align="center">
                {'\u20B9'}
                {tripSalaryDeatails.totalTripSalary + totalExpenseAmount}
            </TableCell>
        </>
    )
}

type rowType = (
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>,
    trip: getTripProps,
    index: number,
    totalExpenseAmount: number
) => ReactElement
const getRow: rowType = (setActivateDialog, trip, index, totalExpenseAmount) => {
    return (
        <TableRow key={index + 1}>
            {tripDetailsCell(trip, index)}
            {driverAmountCells(totalExpenseAmount, trip.tripSalaryDetails)}
            {buttonCell(setActivateDialog)}
        </TableRow>
    )
}
type tableBody = (
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>,
    driverTrips: tripProps[],
    expenses: expensesProps[]
) => ReactElement
const tableBody: tableBody = (setActivateDialog, driverTrips, expenses) => {
    return (
        <TableBody>
            {driverTrips &&
                driverTrips.map((trip: tripProps, index: number) => {
                    const expenseByTrip = expenses.filter((expense) => expense.tripId === trip.id)
                    const totalExpenseAmount = expenseByTrip.reduce(
                        (total, expense) => total + expense.acceptedAmount,
                        0
                    )
                    return getRow(setActivateDialog, getTrip(trip), index, totalExpenseAmount)
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
