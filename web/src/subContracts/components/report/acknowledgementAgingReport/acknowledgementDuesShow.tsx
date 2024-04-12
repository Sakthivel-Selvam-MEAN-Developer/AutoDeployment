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

interface Row {
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    margin: number
    transporterBalance: number
    tripStatus: boolean
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
            csmName: string
        }
    }
    endDate: number
    invoiceNumber: string
    loadingPoint: {
        name: string
    }
    unloadingPoint: {
        name: string
    }
    filledLoad: string
    startDate: number
}
interface Props {
    acknowledgementStatus: boolean
    loadingPointToStockPointTrip: Row
    loadingPointToUnloadingPointTrip: Row
    shortageQuantity: shortageQuantity[]
}
interface shortageQuantity {
    unloadedDate: number
}
interface listoverallTripProps {
    acknowledgementDueDetails: Props[]
    setskipNumber: React.Dispatch<React.SetStateAction<number>>
}

const cellNames = [
    'Vehicle Number',
    'Unloading Date',
    'Invoice Number',
    'Transporter Name',
    'CSM Name'
]
const cells = (cell: string, index: number) => {
    return (
        <TableCell key={index} align="center">
            {cell}
        </TableCell>
    )
}
const tableRow = (
    <TableRow>
        <TableCell>#</TableCell>
        {cellNames.map((name, index) => cells(name, index))}
    </TableRow>
)
function getTableHead() {
    return <TableHead>{tableRow}</TableHead>
}
const getCells = (data: Row, num: number, unloadDate: number) => {
    return (
        <>
            <TableCell> {num} </TableCell>
            <TableCell align="left">{data.truck.vehicleNumber}</TableCell>
            <TableCell align="left">{epochToMinimalDate(unloadDate)}</TableCell>
            <TableCell align="left">{data.invoiceNumber}</TableCell>
            <TableCell align="left">{data.truck.transporter.name}</TableCell>
            <TableCell align="left">{data.truck.transporter.csmName}</TableCell>
        </>
    )
}
function getTableBody(allTrips: Props[]) {
    let number = 0
    return (
        <TableBody>
            {allTrips.map((row: Props, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {getCells(
                        loadingToStock(row)
                            ? row.loadingPointToStockPointTrip
                            : row.loadingPointToUnloadingPointTrip,
                        ++number,
                        row.shortageQuantity[0].unloadedDate
                    )}
                </TableRow>
            ))}
        </TableBody>
    )
}
const download = (listoverallTrip: Props[]) => {
    const downloadtripData: object[] = []
    listoverallTrip.map((row: Props) => {
        downloadCSV(
            loadingToStock(row)
                ? row.loadingPointToStockPointTrip
                : row.loadingPointToUnloadingPointTrip,
            row.shortageQuantity[0].unloadedDate,
            listoverallTrip.length,
            downloadtripData
        )
    })
}
const downloadCSV = (data: Row, date: number, num: number, downloadtripData: object[]) => {
    const addData = {
        vehicleNmber: data.truck.vehicleNumber,
        unloadingDate: epochToMinimalDate(date),
        invoiceNumber: data.invoiceNumber,
        transporterName: data.truck.transporter.name,
        CsmName: data.truck.transporter.csmName
    }
    downloadtripData.push(addData)
    if (downloadtripData.length === num) {
        const data = downloadtripData
        const fileName = 'Acknowledgement Due Dates'
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
const ListAllAcknowledgementDueDetails: React.FC<listoverallTripProps> = ({
    acknowledgementDueDetails,
    setskipNumber
}) => {
    return (
        <>
            <br />
            <div style={{ float: 'right' }}>
                <Button onClick={() => download(acknowledgementDueDetails)} variant="contained">
                    Generate Form
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    {getTableHead()} {getTableBody(acknowledgementDueDetails)}
                </Table>
            </TableContainer>
            <div style={{ ...style, position: 'sticky' }}>
                <Stack spacing={10}>
                    <Pagination
                        count={100}
                        size="large"
                        color="primary"
                        onChange={(_e, value) => setskipNumber(value - 1)}
                    />
                </Stack>
            </div>
        </>
    )
}

export default ListAllAcknowledgementDueDetails
function loadingToStock(row: Props) {
    return (
        row.loadingPointToStockPointTrip !== null && row.loadingPointToStockPointTrip !== undefined
    )
}
