import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

interface gridProps {
    row: alignedtrip[]
    column: GridColDef[]
    handleSelection?: (params: GridRowSelectionModel) => void
}
export interface alignedtrip {
    id: number
    startDate: string
    invoiceNumber: string
    vehicleNumber: string
    loadingPoint: string | undefined
    unloadingPoint: string | undefined
    freightAmount: number
    totalFreightAmount: number
    filledLoad: number | undefined
}
const TripsDataGrid: React.FC<gridProps> = ({ row, column, handleSelection }) => {
    return (
        <div>
            <DataGrid
                columns={column}
                rows={row}
                onRowSelectionModelChange={handleSelection}
                // checkboxSelection
                disableRowSelectionOnClick
                hideFooterPagination
                initialState={{ sorting: { sortModel: [{ field: 'startDate', sort: 'asc' }] } }}
            />
        </div>
    )
}

export default TripsDataGrid
