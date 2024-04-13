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

interface Props {
    name: string
    dueDate: number
    payableAmount: number
    overallTrip: {
        loadingPointToUnloadingPointTrip: {
            truck: {
                transporter: {
                    csmName: string
                }
            }
        }
        loadingPointToStockPointTrip: {
            truck: {
                transporter: {
                    csmName: string
                }
            }
        }
    }
}

interface listTransporterProps {
    transporterDueData: Props[]
    setskipNumber: React.Dispatch<React.SetStateAction<number>>
}
const tableCell = () => {
    return (
        <>
            <TableCell align="left">Transporter Name</TableCell>
            <TableCell align="left">CSM Name</TableCell>
            <TableCell align="left">Due Date</TableCell>
            <TableCell align="left">Amount</TableCell>
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
type cellType = (
    data: Props,
    trip: { truck: { transporter: { csmName: string } } } | null
) => ReactElement
const getCells: cellType = (data, trip) => {
    return (
        <>
            <TableCell align="left">{data.name}</TableCell>
            <TableCell align="left">{trip?.truck.transporter.csmName}</TableCell>
            <TableCell align="left">{epochToMinimalDate(data.dueDate)}</TableCell>
            <TableCell align="left">{data.payableAmount}</TableCell>
        </>
    )
}
const tableBodyCell = (row: Props, index: number, number: number) => {
    const style = { '&:last-child td, &:last-child th': { border: 0 } }
    return (
        <TableRow key={index} sx={style}>
            <TableCell> {++number} </TableCell>
            {getCells(row, getTripType(row))}
        </TableRow>
    )
}
function getTableBody(allTrips: Props[]) {
    const number = 0
    return <TableBody>{allTrips.map((row, index) => tableBodyCell(row, index, number))}</TableBody>
}

const getTripType = (row: Props) => {
    return row.overallTrip.loadingPointToStockPointTrip !== null
        ? row.overallTrip.loadingPointToStockPointTrip
        : row.overallTrip.loadingPointToUnloadingPointTrip !== null
          ? row.overallTrip.loadingPointToUnloadingPointTrip
          : null
}
function download(listoverallTrip: Props[]) {
    const downloadtripData: object[] = []
    listoverallTrip.map((row: Props) => {
        downloadCSV(row, downloadtripData, listoverallTrip.length)
    })
}
const downloadCSV = (Dues: Props, downloadtripData: object[], num: number) => {
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

function tableContainer(transporterDueData: Props[]) {
    return <TableContainer component={Paper}>{table(transporterDueData)}</TableContainer>
}

function table(transporterDueData: Props[]) {
    return (
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
            {getTableHead()}
            {getTableBody(transporterDueData)}
        </Table>
    )
}

function generateCSVButton(transporterDueData: Props[]) {
    return (
        <div style={{ float: 'right', marginTop: '10px' }}>
            <Button onClick={() => download(transporterDueData)} variant="contained">
                Generate Form
            </Button>
        </div>
    )
}
