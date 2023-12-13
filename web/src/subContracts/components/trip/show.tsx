import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { epochToMinimalDate } from '../../../wonderMove/components/epochToTime'

interface Props {
    allTrips: Row[]
}
interface Row {
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    transporterBalance: number
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
        }
    }
    endDate: number
    invoiceNumber: string
    factory: {
        name: string
    }
    deliveryPoint: {
        name: string
    }
    filledLoad: string
    startDate: number
}
const paymentStatus = (row: any) => {
    if (row.transporterBalance > 0) {
        return '70% Paid'
    } else return 'Pending'
}

function getTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Vehicle Number</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">Transporter</TableCell>
                <TableCell align="left">InvoiceNumber</TableCell>
                <TableCell align="left">Factory Point</TableCell>
                <TableCell align="left">Delivery Point</TableCell>
                <TableCell align="left">Freight Amount</TableCell>
                <TableCell align="left">Transporter amount</TableCell>
                <TableCell align="left">Quantity Loaded</TableCell>
                <TableCell align="left">Total Freight Amount</TableCell>
                <TableCell align="left">Total Transporter Amount</TableCell>
                <TableCell align="left">Payment Status</TableCell>
            </TableRow>
        </TableHead>
    )
}

function getTableBody(allTrips: Row[]) {
    return (
        <TableBody>
            {allTrips.map((row, index) => (
                <TableRow
                    key={index}
                    sx={{
                        '&:last-child td, &:last-child th': {
                            border: 0
                        }
                    }}
                >
                    <TableCell> {index + 1} </TableCell>
                    <TableCell align="left">{row.truck.vehicleNumber}</TableCell>
                    <TableCell align="left">{epochToMinimalDate(row.startDate)}</TableCell>
                    <TableCell align="left">{row.truck.transporter.name}</TableCell>
                    <TableCell align="left">{row.invoiceNumber}</TableCell>
                    <TableCell align="left">{row.factory.name}</TableCell>
                    <TableCell align="left">{row.deliveryPoint.name}</TableCell>
                    <TableCell align="left">{row.freightAmount}</TableCell>
                    <TableCell align="left">{row.transporterAmount}</TableCell>
                    <TableCell align="left">{row.filledLoad}</TableCell>
                    <TableCell align="left">{row.totalFreightAmount}</TableCell>
                    <TableCell align="left">{row.totalTransporterAmount}</TableCell>
                    <TableCell align="left">{paymentStatus(row)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

const ListAllTrip: React.FC<Props> = ({ allTrips }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    {getTableHead()}
                    {getTableBody(allTrips)}
                </Table>
            </TableContainer>
        </>
    )
}

export default ListAllTrip
