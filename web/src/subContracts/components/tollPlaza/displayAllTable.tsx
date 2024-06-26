import { TextField, Typography } from '@mui/material'
import { overallTripp } from './type'
import { DataGrid } from '@mui/x-data-grid'
import { rows } from './firstTable'
import { dataGrid } from './listForAllTrip'
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
export const ShowTable = (display: overallTripp[], handleCloseToll: (params: dataGrid) => void) => {
    return (
        <>
            <Typography sx={{ fontWeight: 'bold' }}>Toll Entered Trips</Typography>
            <DataGrid
                rows={rows(display) || []}
                columns={submittedColumns}
                hideFooterPagination
                onRowClick={handleCloseToll}
            />
        </>
    )
}
