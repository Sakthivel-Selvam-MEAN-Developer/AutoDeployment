import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, Pagination, Stack, SxProps, Theme } from '@mui/material'
import exportFromJSON from 'export-from-json'
import { Dispatch } from 'react'
import { SetStateAction } from 'jotai'

interface Row {
    vehicleNumber: string
    invoiceNumber: string
    transporterName: string
    csmName: string
    transporterAmount: number
    totalPaidAmount: number
    differenceAmount: number
}

interface listProps {
    discrepancyDueDetails: Row[]
    setskipNumber: React.Dispatch<React.SetStateAction<number>>
}

const cellNames = [
    '#',
    'Vehicle Number',
    'Invoice Number',
    'Transporter Name',
    'CSM Name',
    'Transporter Amount',
    'Total Paid Amount',
    'Difference Amount'
]
const tabelRow = (
    <TableRow>
        {cellNames.map((name, index) => (
            <TableCell key={index}>{name}</TableCell>
        ))}
    </TableRow>
)
function getTableHead() {
    return <TableHead>{tabelRow}</TableHead>
}
const getCells = (data: Row) => {
    return (
        <>
            <TableCell align="left">{data.vehicleNumber}</TableCell>
            <TableCell align="left">{data.invoiceNumber}</TableCell>
            <TableCell align="left">{data.transporterName}</TableCell>
            {getSubCells(data)}
        </>
    )
}
const getSubCells = (data: Row) => {
    return (
        <>
            <TableCell align="left">{data.csmName}</TableCell>
            <TableCell align="left">{data.transporterAmount}</TableCell>
            <TableCell align="left">{data.totalPaidAmount}</TableCell>
            <TableCell align="left">{data.differenceAmount.toFixed(2)}</TableCell>
        </>
    )
}
const tableRow = (row: Row, number: number, index: number, style: SxProps<Theme> | undefined) => {
    return (
        <TableRow key={index} sx={style}>
            <TableCell> {++number} </TableCell>
            {getCells(row)}
        </TableRow>
    )
}
const tableBody = (allTrips: Row[], number: number, style: SxProps<Theme> | undefined) => {
    return (
        <TableBody>
            {allTrips.map((row: Row, index) => tableRow(row, number, index, style))}
        </TableBody>
    )
}
function getTableBody(allTrips: Row[]) {
    const number = 0
    const style = { '&:last-child td, &:last-child th': { border: 0 } }
    return tableBody(allTrips, number, style)
}
function download(listoverallTrip: Row[]) {
    const downloadtripData: object[] = []
    listoverallTrip.map((row: Row) => {
        downloadCSV(row, listoverallTrip.length, downloadtripData)
    })
}
const downloadCSV = (data: Row, num: number, downloadtripData: object[]) => {
    const addData = {
        vehicleNmber: data.vehicleNumber,
        invoiceNumber: data.invoiceNumber,
        transporterName: data.transporterName,
        csmName: data.csmName,
        transporterAmount: data.transporterAmount,
        totalPaidAmount: data.totalPaidAmount,
        differenceAmount: data.differenceAmount
    }
    downloadtripData.push(addData)
    if (downloadtripData.length === num) {
        const data = downloadtripData
        const fileName = 'Discrepancy Payment Report'
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
const pagination = (setskipNumber: Dispatch<SetStateAction<number>>) => {
    return (
        <Pagination
            count={100}
            size="large"
            color="primary"
            onChange={(_e, value) => setskipNumber(value - 1)}
        />
    )
}
const ListDiscrepancyDetails: React.FC<listProps> = ({ discrepancyDueDetails, setskipNumber }) => {
    return (
        <>
            {generateCSVButton(discrepancyDueDetails)}
            {tableContainer(discrepancyDueDetails)}
            {stack(setskipNumber)}
        </>
    )
}

export default ListDiscrepancyDetails
function stack(setskipNumber: Dispatch<SetStateAction<number>>) {
    return (
        <div style={{ ...style, position: 'sticky' }}>
            <Stack spacing={10}>{pagination(setskipNumber)}</Stack>
        </div>
    )
}

function tableContainer(discrepancyDueDetails: Row[]) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                {getTableHead()} {getTableBody(discrepancyDueDetails)}
            </Table>
        </TableContainer>
    )
}

function generateCSVButton(discrepancyDueDetails: Row[]) {
    return (
        <div style={{ float: 'right', marginTop: '10px' }}>
            <Button onClick={() => download(discrepancyDueDetails)} variant="contained">
                Download CSV
            </Button>
        </div>
    )
}
