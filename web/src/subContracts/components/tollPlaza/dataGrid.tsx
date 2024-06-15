import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { overallTrip } from './type'

interface gridProps {
    row: overallTrip[]
    column: GridColDef[]
}

const TripsDataGrid: React.FC<gridProps> = ({ row, column }) => {
    return <DataGrid columns={column} rows={row} />
}

export default TripsDataGrid
