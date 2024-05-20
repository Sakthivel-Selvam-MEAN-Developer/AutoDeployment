import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import exportFromJSON from 'export-from-json'
import { FC } from 'react'

interface Props {
    completedPayments: completedPaymentsProps[]
}
interface completedPaymentsProps {
    vehicleNumber: string
    name: string
    dueDate: number
    paidAt: number
    transactionId: string
    type: string
    payableAmount: string
    overallTrip: {
        loadingPointToStockPointTrip: {
            invoiceNumber: string
            unloadingPoint: { name: string }
            loadingPoint: { name: string }
            truck: { transporter: { csmName: string } }
        }
        stockPointToUnloadingPointTrip: {
            unloadingPoint: { name: string }
        }
        loadingPointToUnloadingPointTrip: {
            invoiceNumber: string
            loadingPoint: { name: string }
            unloadingPoint: { name: string }
            truck: { transporter: { csmName: string } }
        }
    }
}
const cellData = [
    'Vehicle Number',
    'Invoice Number',
    'Loading Point',
    'UnLoading Point',
    'Transporter Name',
    'Payment Date',
    'Payment Type',
    'Transaction Id',
    'Amount',
    'CSM Name'
]
function getRow() {
    return (
        <TableRow>
            <TableCell>#</TableCell>
            {cellData.map((data) => (
                <TableCell key={data} align="left">
                    {data}
                </TableCell>
            ))}
        </TableRow>
    )
}
const getTableHead = () => {
    return <TableHead>{getRow()}</TableHead>
}
const getTripType = (row: completedPaymentsProps) => {
    let type
    if (row.overallTrip && row.overallTrip.loadingPointToStockPointTrip !== null) {
        type = row.overallTrip.loadingPointToStockPointTrip
    } else if (row.overallTrip && row.overallTrip.loadingPointToUnloadingPointTrip !== null) {
        type = row.overallTrip.loadingPointToUnloadingPointTrip
    }
    return type
}
interface getCellsProps {
    row: completedPaymentsProps
    index: number
}
const GetCells: FC<getCellsProps> = ({ row, index }) => {
    const trip = getTripType(row)
    return (
        <>
            <TableCell> {index + 1} </TableCell>
            <TableCell align="left">{row.vehicleNumber}</TableCell>
            <TableCell align="left">
                {row.overallTrip !== null ? trip?.invoiceNumber : 'Null'}
            </TableCell>
            <TableCell align="left">
                {row.overallTrip !== null ? trip?.loadingPoint.name : 'Null'}
            </TableCell>
            <TableCell align="left">
                {row.overallTrip !== null && row.overallTrip.stockPointToUnloadingPointTrip !== null
                    ? row.overallTrip.stockPointToUnloadingPointTrip.unloadingPoint.name
                    : trip?.unloadingPoint !== undefined
                      ? trip?.unloadingPoint.name
                      : 'Null'}
            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{epochToMinimalDate(row.paidAt)}</TableCell>
            <TableCell align="left">{row.type}</TableCell>
            <TableCell align="left">{row.transactionId}</TableCell>
            <TableCell align="left">{row.payableAmount}</TableCell>
            <TableCell align="left">
                {row.type !== 'fuel pay'
                    ? row.overallTrip !== null && trip?.truck.transporter.csmName
                    : 'NUll'}
            </TableCell>
        </>
    )
}
const getTableBody = (allTrips: completedPaymentsProps[]) => {
    return (
        <>
            <TableBody>
                {allTrips.map((row: completedPaymentsProps, index: number) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <GetCells row={row} index={index} />
                    </TableRow>
                ))}
            </TableBody>
        </>
    )
}

function download(completedPayments: completedPaymentsProps[]) {
    const downloadDueData: object[] = []
    completedPayments.map((data) => {
        downloadCSV(data, downloadDueData, completedPayments.length)
    })
}
const downloadCSV = (data: completedPaymentsProps, downloadtripData: object[], num: number) => {
    const addData = {
        TransporterName: data.name,
        PaidOn: epochToMinimalDate(data.paidAt),
        PaymentType: data.type,
        TransactionId: data.transactionId,
        PaidAmount: data.payableAmount,
        CsmName:
            data.type !== 'fuel pay'
                ? data.overallTrip.loadingPointToUnloadingPointTrip !== null
                    ? data.overallTrip.loadingPointToUnloadingPointTrip.truck.transporter.csmName
                    : data.overallTrip.loadingPointToStockPointTrip.truck.transporter.csmName
                : 'NUll'
    }
    downloadtripData.push(addData)
    if (downloadtripData.length === num) {
        const data = downloadtripData
        const fileName = 'Completed Payments'
        const exportType = exportFromJSON.types.csv
        exportFromJSON({ data, fileName, exportType })
    }
}
const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'right'
}
const CompletedPaymentTable: React.FC<Props> = ({ completedPayments }) => {
    return (
        <>
            <DownloadCsvButton completedPayments={completedPayments} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    {getTableHead()}
                    {getTableBody(completedPayments)}
                </Table>
            </TableContainer>
        </>
    )
}

export default CompletedPaymentTable
interface DownloadCsvButtonProps {
    completedPayments: completedPaymentsProps[]
}
const DownloadCsvButton: FC<DownloadCsvButtonProps> = ({ completedPayments }) => {
    return (
        <div style={style}>
            <Button color="primary" variant="contained" onClick={() => download(completedPayments)}>
                Download Report
            </Button>
        </div>
    )
}
