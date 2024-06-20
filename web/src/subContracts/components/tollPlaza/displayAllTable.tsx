import { TextField } from '@mui/material'
import { overallTripp } from './type'
import { DataGrid } from '@mui/x-data-grid'
import { rows } from './firstTable'
const submittedColumns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', minWidth: 100, flex: 1 },
    { field: 'startDate', headerName: 'Start Date', minWidth: 100, flex: 1 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', minWidth: 100, flex: 1 },
    { field: 'loadingPoint', headerName: 'Loading Point', minWidth: 100, flex: 1 },
    { field: 'stockPoint', headerName: 'Stock Point', minWidth: 100, flex: 1 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', minWidth: 100, flex: 1 }
]
export const InputFields = (
    tollFare: string,
    setTollFare: React.Dispatch<React.SetStateAction<string>>
) => {
    return (
        <TextField
            sx={{ width: '250px' }}
            fullWidth
            margin="normal"
            label="Toll Fare"
            value={tollFare}
            onChange={(e) => setTollFare(e.target.value)}
        />
    )
}
export const ShowTable = (display: overallTripp[]) => {
    return <DataGrid rows={rows(display) || []} columns={submittedColumns} hideFooterPagination />
} // eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const Data = (trip: overallTripp[], handleRowClick: (params: any) => void) => {
    return (
        <DataGrid
            rows={rows(trip)}
            columns={columns}
            hideFooterPagination
            onRowClick={handleRowClick}
        />
    )
}
const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', minWidth: 100, flex: 1 },
    { field: 'startDate', headerName: 'Start Date', minWidth: 100, flex: 1 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', minWidth: 100, flex: 1 },
    { field: 'loadingPoint', headerName: 'Loading Point', minWidth: 100, flex: 1 },
    { field: 'stockPoint', headerName: 'Stock Point', minWidth: 100, flex: 1 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', minWidth: 100, flex: 1 }
]
