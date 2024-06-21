import { dataGrid } from './listForAllTrip'
import { overallTripp } from './type'
import { DataGrid } from '@mui/x-data-grid'
import { rows } from './firstTable'

const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', minWidth: 100, flex: 1 },
    { field: 'startDate', headerName: 'Start Date', minWidth: 100, flex: 1 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', minWidth: 100, flex: 1 },
    { field: 'loadingPoint', headerName: 'Loading Point', minWidth: 100, flex: 1 },
    { field: 'stockPoint', headerName: 'Stock Point', minWidth: 100, flex: 1 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', minWidth: 100, flex: 1 }
]
export const Data = (trip: overallTripp[], handleRowClick: (params: dataGrid) => void) => {
    return (
        <DataGrid
            rows={rows(trip)}
            columns={columns}
            hideFooterPagination
            onRowClick={handleRowClick}
        />
    )
}
