import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import { alignedtrip } from './type'

interface gridProps {
    row: alignedtrip[]
    column: GridColDef[]
    handleSelection?: (params: GridRowSelectionModel) => void
}

const TripsDataGrid: React.FC<gridProps> = ({ row, column, handleSelection }) => {
    return (
        <div>
            <DataGrid
                columns={column}
                rows={row}
                onRowSelectionModelChange={handleSelection}
                checkboxSelection
                disableRowSelectionOnClick
                hideFooterPagination
            />
        </div>
    )
}

export default TripsDataGrid
