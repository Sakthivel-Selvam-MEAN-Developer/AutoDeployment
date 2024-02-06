import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { Button, Pagination, Stack } from '@mui/material'
import exportFromJSON from 'export-from-json'

interface Row {
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    transporterBalance: number
    tripStatus: boolean
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
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
    paymentDues: paymentType[]
}
interface paymentType {
    type: string
}
interface listoverallTripProps {
    listoverallTrip: Props[]
    setskipNumber: React.Dispatch<React.SetStateAction<number>>
}

function getTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Vehicle Number</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">Transporter</TableCell>
                <TableCell align="left">Loading Point</TableCell>
                <TableCell align="left">Freight Amount</TableCell>
                <TableCell align="left">Tansporter Amount</TableCell>
                <TableCell align="left">Total Freight Amount</TableCell>
                <TableCell align="left">Total Tansporter Amount</TableCell>
                <TableCell align="left">Trip Status</TableCell>
                <TableCell align="left">Payment Status</TableCell>
            </TableRow>
        </TableHead>
    )
}

const getCells = (data: Row, num: number, type: string | false) => {
    return (
        <>
            <TableCell> {num} </TableCell>
            <TableCell align="left">{data.truck.vehicleNumber}</TableCell>
            <TableCell align="left">{epochToMinimalDate(data.startDate)}</TableCell>
            <TableCell align="left">{data.truck.transporter.name}</TableCell>
            <TableCell align="left">{data.loadingPoint.name}</TableCell>
            <TableCell align="left">{data.freightAmount}</TableCell>
            <TableCell align="left">{data.transporterAmount}</TableCell>
            <TableCell align="left">{data.totalFreightAmount}</TableCell>
            <TableCell align="left">{data.totalTransporterAmount}</TableCell>
            <TableCell align="left">
                {data.tripStatus === false ? 'Running' : 'completed'}
            </TableCell>
            <TableCell align="left">{type === false ? 'pending' : type}</TableCell>
        </>
    )
}
const checkPaymentStatus = (arrayOfDues: paymentType[]) => {
    const a = arrayOfDues.filter((due) => {
        return due.type === 'final pay'
    })
    return a.length !== 1 ? 'initial pay' : 'final pay'
}
function getTableBody(allTrips: Props[]) {
    let number = 0
    const style = { '&:last-child td, &:last-child th': { border: 0 } }
    return (
        <TableBody>
            {allTrips.map((row: Props, index) => {
                if (loadingToStock(row)) {
                    return (
                        <TableRow key={index} sx={style}>
                            {getCells(
                                row.loadingPointToStockPointTrip,
                                ++number,
                                row.paymentDues.length !== 0
                                    ? checkPaymentStatus(row.paymentDues)
                                    : false
                            )}
                        </TableRow>
                    )
                }
                if (loadingToUnloading(row)) {
                    return (
                        <TableRow key={index} sx={style}>
                            {getCells(
                                row.loadingPointToUnloadingPointTrip,
                                ++number,
                                row.paymentDues.length !== 0
                                    ? checkPaymentStatus(row.paymentDues)
                                    : false
                            )}
                        </TableRow>
                    )
                }
            })}
        </TableBody>
    )
}
export function download(listoverallTrip: Props[]) {
    const downloadtripData: object[] = []
    listoverallTrip.map((row: Props) => {
        if (
            row.loadingPointToStockPointTrip !== null &&
            row.loadingPointToStockPointTrip !== undefined
        ) {
            downloadCSV(
                downloadtripData,
                row.loadingPointToStockPointTrip,
                row.paymentDues.length !== 0 ? checkPaymentStatus(row.paymentDues) : false,
                listoverallTrip.length
            )
        }
        if (
            row.loadingPointToUnloadingPointTrip !== null &&
            row.loadingPointToUnloadingPointTrip !== undefined
        ) {
            downloadCSV(
                downloadtripData,
                row.loadingPointToUnloadingPointTrip,
                row.paymentDues.length !== 0 ? checkPaymentStatus(row.paymentDues) : false,
                listoverallTrip.length
            )
        }
    })
}
const downloadCSV = (
    downloadtripData: object[],
    tripData: Row,
    type: string | false,
    num: number
) => {
    const addData = {
        vehicleNumber: tripData.truck.vehicleNumber,
        startDate: epochToMinimalDate(tripData.startDate),
        transporter: tripData.truck.transporter.name,
        loadingPoint: tripData.loadingPoint.name,
        freightAmount: tripData.freightAmount,
        tansporterAmount: tripData.transporterAmount,
        totalFreightAmount: tripData.totalFreightAmount,
        totalTansporterAmount: tripData.totalTransporterAmount,
        tripStatus: tripData.tripStatus === false ? 'Running' : 'completed',
        paymentStatus: type === false ? 'pending' : type
    }
    downloadtripData.push(addData)
    if (downloadtripData.length === num) {
        const data = downloadtripData
        const fileName = 'list of Trips'
        const exportType = exportFromJSON.types.csv
        exportFromJSON({ data, fileName, exportType })
    }
}
const style = {
    display: 'flex',
    bottom: '0',
    width: '90%',
    justifyContent: 'center',
    marginBottom: '30px'
}
const ListAllDetails: React.FC<listoverallTripProps> = ({ listoverallTrip, setskipNumber }) => {
    return (
        <>
            <br />
            <br />
            <div style={{ float: 'right' }}>
                <Button onClick={() => download(listoverallTrip)} variant="contained">
                    Download CSV
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    {getTableHead()}
                    {getTableBody(listoverallTrip)}
                </Table>
            </TableContainer>
            <div style={{ ...style, position: 'absolute' }}>
                <Stack spacing={10}>
                    <Pagination
                        count={10}
                        size="large"
                        color="primary"
                        onChange={(_e, value) => {
                            setskipNumber(value - 1)
                        }}
                    />
                </Stack>
            </div>
        </>
    )
}

export default ListAllDetails
function loadingToStock(row: Props) {
    return (
        row.loadingPointToStockPointTrip !== null && row.loadingPointToStockPointTrip !== undefined
    )
}

function loadingToUnloading(row: Props) {
    return (
        row.loadingPointToUnloadingPointTrip !== null &&
        row.loadingPointToUnloadingPointTrip !== undefined
    )
}
