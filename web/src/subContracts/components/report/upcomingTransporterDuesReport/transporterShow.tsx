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
const getCells = (
    data: Props,
    num: number,
    trip: { truck: { transporter: { csmName: string } } } | null
) => {
    return (
        <>
            <TableCell> {num} </TableCell>
            <TableCell align="left">{data.name}</TableCell>
            <TableCell align="left">{trip?.truck.transporter.csmName}</TableCell>
            <TableCell align="left">{epochToMinimalDate(data.dueDate)}</TableCell>
            <TableCell align="left">{data.payableAmount}</TableCell>
        </>
    )
}
function getTableBody(allTrips: Props[]) {
    let number = 0
    const style = { '&:last-child td, &:last-child th': { border: 0 } }
    return (
        <TableBody>
            {allTrips.map((row, index) => {
                return (
                    <TableRow key={index} sx={style}>
                        {getCells(
                            row,
                            ++number,
                            row.overallTrip.loadingPointToStockPointTrip !== null
                                ? row.overallTrip.loadingPointToStockPointTrip
                                : row.overallTrip.loadingPointToUnloadingPointTrip !== null
                                  ? row.overallTrip.loadingPointToUnloadingPointTrip
                                  : null
                        )}
                    </TableRow>
                )
            })}
        </TableBody>
    )
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
            <br />
            <div style={{ float: 'right' }}>
                <Button onClick={() => download(transporterDueData)} variant="contained">
                    Generate Form
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    {getTableHead()}
                    {getTableBody(transporterDueData)}
                </Table>
            </TableContainer>
            <div style={{ ...style, position: 'sticky' }}>
                <Stack spacing={10}>
                    <Pagination
                        count={100}
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
