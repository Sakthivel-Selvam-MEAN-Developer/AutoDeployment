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
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
        }
    }
    endDate: number
    invoiceNumber: string
    factory: {
        location: string
    }
    deliveryPoint: {
        location: string
    }
    filledLoad: string
    startDate: number
}

function getTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Vehicle Number</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End date</TableCell>
                <TableCell align="left">Transporter</TableCell>
                <TableCell align="left">InvoiceNumber</TableCell>
                <TableCell align="left">Factory Point</TableCell>
                <TableCell align="left">Delivery Point</TableCell>
                <TableCell align="left">Quantity Loaded</TableCell>
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
                    <TableCell align="left">{epochToMinimalDate(row.endDate)}</TableCell>
                    <TableCell align="left">{row.truck.transporter.name}</TableCell>
                    <TableCell align="left">{row.invoiceNumber}</TableCell>
                    <TableCell align="left">{row.factory.location}</TableCell>
                    <TableCell align="left">{row.deliveryPoint.location}</TableCell>
                    <TableCell align="left">{row.filledLoad}</TableCell>
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
