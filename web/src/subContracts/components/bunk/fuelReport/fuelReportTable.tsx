import { FC } from 'react'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'fueledDate', headerName: 'fueledDate', width: 240 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 150 },
    { field: 'loadingPoint', headerName: 'LoadingPoint Name', width: 120 },
    { field: 'stockPointName', headerName: 'StockPoint Name', width: 150 },
    { field: 'unLodaingPoint', headerName: 'UnLodaingPoint', width: 240 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'pricePerliter', headerName: 'Rate/Ltr', width: 130 },
    { field: 'totalprice', headerName: 'Amount', width: 130 },
    { field: 'fuelInvoiceNumber', headerName: 'Fuel Bill', width: 130 },
    { field: 'transactionId', headerName: 'Transaction Id', width: 130 },
    { field: 'tripInvoiceNumber', headerName: 'Trip InvoiceNumber', width: 130 }
]
interface fuelDataObject {
    bunkName: string
    fuelInvoiceNumber: string
    fueledDate: number
    id: number
    loadingPoint: string
    pricePerliter: number
    quantity: number
    stockPointName: string
    totalprice: number
    transactionId: string
    tripInvoiceNumber: string
    unLodaingPoint: string
    vehicleNumber: string
}
type DataGridTableProps = {
    fuelReportData: fuelDataObject[]
}
type FuelReportListProps = {
    fuelReportData: fuelDataObject[]
}
const DataGridTable: React.FC<DataGridTableProps> = ({ fuelReportData }) => {
    return (
        <DataGrid
            sx={{ width: '88vw', height: '27vw', marginLeft: 4 }}
            rows={fuelReportData}
            columns={columns}
            getRowId={(row) => row.id}
        />
    )
}
const FuelReportList: FC<FuelReportListProps> = ({ fuelReportData }) => {
    return <DataGridTable fuelReportData={fuelReportData} />
}
export default FuelReportList
