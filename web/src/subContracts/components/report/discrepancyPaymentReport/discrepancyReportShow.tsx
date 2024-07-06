import { Box, Button, Pagination, Stack } from '@mui/material'
import exportFromJSON from 'export-from-json'
import { Dispatch, FC } from 'react'
import { SetStateAction } from 'jotai'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'

interface Row {
    vehicleNumber: string
    unloadingPoint: string
    loadingPoint: string
    startDate: number
    invoiceNumber: string
    transporterName: string
    csmName: string
    transporterAmount: number
    totalPaidAmount: number
    differenceAmount: number
}

interface listProps {
    discrepancyDueDetails: Row[]
    setskipNumber: React.Dispatch<React.SetStateAction<number>>
    totalItems: number
}

const generateRows = (discrepancyDueDetails: Row[]) => {
    return discrepancyDueDetails.map((row, index) => ({
        id: index + 1,
        vehicleNumber: row.vehicleNumber,
        startDate: epochToMinimalDate(row.startDate),
        loadingPoint: row.loadingPoint,
        unloadingPoint: row.unloadingPoint,
        invoiceNumber: row.invoiceNumber,
        transporterName: row.transporterName,
        csmName: row.csmName,
        transporterAmount: row.transporterAmount,
        totalPaidAmount: row.totalPaidAmount,
        differenceAmount: row.differenceAmount.toFixed(2)
    }))
}

const columns: GridColDef[] = [
    { field: 'id', headerName: '#', minWidth: 30, flex: 1 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', minWidth: 100, flex: 1 },
    { field: 'startDate', headerName: 'Start Date', minWidth: 120, flex: 1 },
    { field: 'loadingPoint', headerName: 'Loading Point', minWidth: 150, flex: 1 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', minWidth: 150, flex: 1 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', minWidth: 150, flex: 1 },
    { field: 'transporterName', headerName: 'Transporter Name', minWidth: 150, flex: 1 },
    { field: 'csmName', headerName: 'CSM Name', minWidth: 120, flex: 1 },
    { field: 'transporterAmount', headerName: 'Transporter Amount', minWidth: 150, flex: 1 },
    { field: 'totalPaidAmount', headerName: 'Total Paid Amount', minWidth: 150, flex: 1 },
    { field: 'differenceAmount', headerName: 'Difference Amount', minWidth: 150, flex: 1 }
]
function downloadCSV(data: Row[]) {
    const formattedData = data.map((row) => ({
        vehicleNumber: row.vehicleNumber,
        invoiceNumber: row.invoiceNumber,
        transporterName: row.transporterName,
        csmName: row.csmName,
        transporterAmount: row.transporterAmount,
        totalPaidAmount: row.totalPaidAmount,
        differenceAmount: row.differenceAmount.toFixed(2)
    }))
    const fileName = 'Discrepancy Payment Report'
    const exportType = exportFromJSON.types.csv
    exportFromJSON({ data: formattedData, fileName, exportType })
}
const ListDiscrepancyDetails: FC<listProps> = ({
    discrepancyDueDetails,
    setskipNumber,
    totalItems
}) => {
    const rows = generateRows(discrepancyDueDetails)
    const handleDownloadCSV = () => {
        if (discrepancyDueDetails.length > 0) downloadCSV(discrepancyDueDetails)
    }
    return (
        <>
            {generateCSVButton(handleDownloadCSV)}
            <Box sx={{ height: 400, width: '100%', marginTop: '50px' }}>
                <DataGrid rows={rows} columns={columns} pagination hideFooter />
            </Box>
            {stack(setskipNumber, totalItems)}
        </>
    )
}
export default ListDiscrepancyDetails

function stack(setskipNumber: Dispatch<SetStateAction<number>>, totalItems: number) {
    const style: React.CSSProperties = {
        display: 'flex',
        bottom: '0',
        width: '100%',
        justifyContent: 'center',
        padding: '10px 0',
        background: 'white',
        position: 'sticky'
    }
    return (
        <div style={style}>
            <Stack spacing={10}>
                <Pagination
                    count={Math.ceil(totalItems / 15)}
                    size="large"
                    color="primary"
                    onChange={(_e, value) => setskipNumber(value - 1)}
                />
            </Stack>
        </div>
    )
}

function generateCSVButton(downloadCSV: () => void) {
    return (
        <div style={{ float: 'right', marginBottom: '10px' }}>
            <Button onClick={downloadCSV} variant="contained">
                Download CSV
            </Button>
        </div>
    )
}
