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
    name: string
    dueDate: number
    paidAt: number
    transactionId: string
    type: string
    payableAmount: string
    overallTrip: {
        loadingPointToStockPointTrip: {
            truck: { transporter: { csmName: string } }
        }
        loadingPointToUnloadingPointTrip: {
            truck: { transporter: { csmName: string } }
        }
    }
}
const cellData = [
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

const getTableBody = (allTrips: completedPaymentsProps[]) => {
    return (
        <>
            <TableBody>
                {allTrips.map((row: completedPaymentsProps, index: number) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell> {index + 1} </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{epochToMinimalDate(row.paidAt)}</TableCell>
                        <TableCell align="left">{row.type}</TableCell>
                        <TableCell align="left">{row.transactionId}</TableCell>
                        <TableCell align="left">{row.payableAmount}</TableCell>
                        <TableCell align="left">
                            {row.type !== 'fuel pay'
                                ? row.overallTrip.loadingPointToUnloadingPointTrip !== null
                                    ? row.overallTrip.loadingPointToUnloadingPointTrip.truck
                                          .transporter.csmName
                                    : row.overallTrip.loadingPointToStockPointTrip.truck.transporter
                                          .csmName
                                : ''}
                        </TableCell>
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
        name: data.name,
        paidAt: epochToMinimalDate(data.paidAt),
        type: data.type,
        transactionId: data.transactionId,
        payableAmount: data.payableAmount
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
