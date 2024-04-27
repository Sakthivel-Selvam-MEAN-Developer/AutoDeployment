import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, Pagination, Stack } from '@mui/material'
import exportFromJSON from 'export-from-json'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { Dispatch, ReactElement } from 'react'
import { SetStateAction } from 'jotai'

interface OverallProps {
    name: string
    dueDate: number
    payableAmount: number
    overallTrip: {
        loadingPointToUnloadingPointTrip: props
        loadingPointToStockPointTrip: props
    }
}
interface unloadingProps {
    unloadingPoint: {
        name: string
    }
}
interface props {
    startDate: number
    invoiceNumber: string
    truck: {
        vehicleNumber: string
        transporter: {
            csmName: string
        }
    }
    loadingPoint: {
        name: string
    }
    stockPointToUnloadingPointTrip: unloadingProps[]
    unloadingPoint:
        | {
              name: string
          }
        | undefined
}

interface listTransporterProps {
    transporterDueData: OverallProps[]
    setskipNumber: React.Dispatch<React.SetStateAction<number>>
}
const tableCell = () => {
    return (
        <>
            <TableCell align="left" style={{ fontWeight: 'bold' }}>
                Transporter Name
            </TableCell>
            <TableCell align="left" style={{ fontWeight: 'bold' }}>
                CSM Name
            </TableCell>
            <TableCell align="left" style={{ fontWeight: 'bold' }}>
                Due Date
            </TableCell>
            <TableCell align="left" style={{ fontWeight: 'bold' }}>
                Amount
            </TableCell>
        </>
    )
}
function getTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                {tableCell()}
            </TableRow>
        </TableHead>
    )
}

type cellType = (data: OverallProps, trip: props | null) => ReactElement
const getCells: cellType = (data, trip) => {
    return (
        <>
            <TableCell align="left">{trip?.truck.vehicleNumber}</TableCell>
            <TableCell align="left">{trip && epochToMinimalDate(trip?.startDate)}</TableCell>
            <TableCell align="left">{trip?.invoiceNumber}</TableCell>
            <TableCell align="left">{trip?.loadingPoint.name}</TableCell>
            <TableCell align="left">
                {trip?.unloadingPoint !== undefined
                    ? trip?.unloadingPoint.name
                    : trip?.stockPointToUnloadingPointTrip[0].unloadingPoint.name}
            </TableCell>
            <TableCell align="left">{data.name}</TableCell>
            <TableCell align="left">{trip?.truck.transporter.csmName}</TableCell>
            <TableCell align="left">{epochToMinimalDate(data.dueDate)}</TableCell>
            <TableCell align="left">{data.payableAmount}</TableCell>
        </>
    )
}
const tableBodyCell = (row: OverallProps, index: number, number: number) => {
    const style = { '&:last-child td, &:last-child th': { border: 0 } }
    return (
        <TableRow key={index} sx={style}>
            <TableCell> {++number} </TableCell>
            {getCells(row, getTripType(row))}
        </TableRow>
    )
}
function getTableBody(allTrips: OverallProps[]) {
    const number = 0
    return <TableBody>{allTrips.map((row, index) => tableBodyCell(row, index, number))}</TableBody>
}

const getTripType = (row: OverallProps) => {
    return row.overallTrip.loadingPointToStockPointTrip !== null
        ? row.overallTrip.loadingPointToStockPointTrip
        : row.overallTrip.loadingPointToUnloadingPointTrip !== null
          ? row.overallTrip.loadingPointToUnloadingPointTrip
          : null
}
function download(listoverallTrip: OverallProps[]) {
    const downloadtripData: object[] = []
    listoverallTrip.map((row: OverallProps) => {
        downloadCSV(row, downloadtripData, listoverallTrip.length)
    })
}
const downloadCSV = (Dues: OverallProps, downloadtripData: object[], num: number) => {
    const data = { transporterName: Dues.name, dueDate: Dues.dueDate, amount: Dues.payableAmount }
    downloadtripData.push(data)
    if (downloadtripData.length === num) {
        const data = downloadtripData
        const fileName = 'Transporter Due Dates'
        const exportType = exportFromJSON.types.csv
        exportFromJSON({ data, fileName, exportType })
    }
}
const style = {
    display: 'flex',
    bottom: '0',
    width: '100%',
    justifyContent: 'center',
    padding: '10px 0',
    background: 'white'
}
const ListAllDetails: React.FC<listTransporterProps> = ({ transporterDueData, setskipNumber }) => {
    return (
        <>
            {generateCSVButton(transporterDueData)}
            {tableContainer(transporterDueData)}
            {stack(setskipNumber)}
        </>
    )
}

export default ListAllDetails

function stack(setskipNumber: Dispatch<SetStateAction<number>>) {
    return (
        <div style={{ ...style, position: 'sticky' }}>
            <Stack spacing={10}>{pagination(setskipNumber)}</Stack>
        </div>
    )
}

function pagination(setskipNumber: Dispatch<SetStateAction<number>>) {
    return (
        <Pagination
            count={100}
            size="large"
            color="primary"
            onChange={(_e, value) => setskipNumber(value - 1)}
        />
    )
}

function tableContainer(transporterDueData: OverallProps[]) {
    return <TableContainer component={Paper}>{table(transporterDueData)}</TableContainer>
}

function table(transporterDueData: OverallProps[]) {
    return (
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
            {getTableHead()}
            {getTableBody(transporterDueData)}
        </Table>
    )
}

function generateCSVButton(transporterDueData: OverallProps[]) {
    return (
        <div style={{ float: 'right', marginTop: '10px' }}>
            <Button onClick={() => download(transporterDueData)} variant="contained">
                Generate Form
            </Button>
        </div>
    )
}
