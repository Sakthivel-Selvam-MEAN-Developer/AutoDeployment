import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
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
        truck: { transporter: { csmName: string } }
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

const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', minWidth: 100, flex: 1 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', minWidth: 100, flex: 1 },
    { field: 'loadingPoint', headerName: 'Loading Point', minWidth: 100, flex: 1 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', minWidth: 100, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 100, flex: 1 },
    {
        field: 'paidAt',
        headerName: 'Payment Date',
        minWidth: 100,
        flex: 1,
        valueFormatter: (value: number) => epochToMinimalDate(value)
    },
    { field: 'type', headerName: 'Payment Type', minWidth: 100, flex: 1 },
    { field: 'transactionId', headerName: 'Transaction Id', minWidth: 100, flex: 1 },
    { field: 'payableAmount', headerName: 'Amount', minWidth: 100, flex: 1 },
    { field: 'csmName', headerName: 'CSM Name', minWidth: 100, flex: 1 }
]
const rows = (completedPayments: completedPaymentsProps[]) => {
    return completedPayments.map((row, index) => {
        const trip = getTripType(row)
        return {
            id: index + 1,
            vehicleNumber: row.vehicleNumber,
            invoiceNumber: row.overallTrip !== null ? trip?.invoiceNumber : 'Null',
            loadingPoint: row.overallTrip ? trip?.loadingPoint.name ?? 'Null' : 'Null',
            unloadingPoint:
                row.overallTrip && row.overallTrip.stockPointToUnloadingPointTrip
                    ? row.overallTrip.stockPointToUnloadingPointTrip.unloadingPoint.name
                    : trip?.unloadingPoint?.name ?? 'Null',
            name: row.name,
            paidAt: row.paidAt,
            type: row.type,
            transactionId: row.transactionId,
            payableAmount: row.payableAmount,
            csmName: trip !== null ? row.overallTrip?.truck.transporter.csmName : 'Null'
        }
    })
}
const getTripType = (row: completedPaymentsProps) => {
    if (row.overallTrip && row.overallTrip.loadingPointToStockPointTrip !== null) {
        return row.overallTrip.loadingPointToStockPointTrip
    } else if (row.overallTrip && row.overallTrip.loadingPointToUnloadingPointTrip !== null) {
        return row.overallTrip.loadingPointToUnloadingPointTrip
    }
    return null
}

function download(completedPayments: completedPaymentsProps[]) {
    const downloadDueData: object[] = []
    completedPayments.forEach((data) =>
        downloadCSV(data, downloadDueData, completedPayments.length)
    )
}
const getCsmName = (data: completedPaymentsProps) => {
    return data.type !== 'fuel pay' ? data.overallTrip.truck.transporter.csmName : 'NUll'
}
const downloadCSV = (data: completedPaymentsProps, downloadtripData: object[], num: number) => {
    const addData = {
        TransporterName: data.name,
        PaidOn: epochToMinimalDate(data.paidAt),
        PaymentType: data.type,
        TransactionId: data.transactionId,
        PaidAmount: data.payableAmount,
        CsmName: getCsmName(data)
    }
    downloadtripData.push(addData)
    if (downloadtripData.length === num) {
        const data = downloadtripData
        const fileName = 'Completed Payments'
        const exportType = exportFromJSON.types.csv
        exportFromJSON({ data, fileName, exportType })
    }
}

const CompletedPaymentTable: React.FC<Props> = ({ completedPayments }) => {
    return (
        <>
            <DownloadCsvButton completedPayments={completedPayments} />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows(completedPayments)} columns={columns} pageSizeOptions={[5]} />
            </div>
        </>
    )
}

interface DownloadCsvButtonProps {
    completedPayments: completedPaymentsProps[]
}

const DownloadCsvButton: FC<DownloadCsvButtonProps> = ({ completedPayments }) => {
    return (
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'right' }}>
            <Button color="primary" variant="contained" onClick={() => download(completedPayments)}>
                Download Report
            </Button>
        </div>
    )
}

export default CompletedPaymentTable
