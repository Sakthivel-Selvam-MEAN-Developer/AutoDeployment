import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import { alignedtrip } from './type'

interface gridProps {
    row: alignedtrip[]
    column: GridColDef[]
    handleSelection?: (params: GridRowSelectionModel) => void
}

// const handleProview = async (params: GridRowSelectionModel, row: alignedtrip[]) => {

// const data = document.getElementById('toll-invoice-format') as HTMLElement
// await downloadPdfForUltraTech(data, 'landscape', 'mm', [3500, 1300], 'Toll')
// const worksheet = XLSX.utils.table_to_sheet(data)
// const workbook = XLSX.utils.book_new()
// XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
// const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
// const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
// saveAs(blob, `toll.xlsx`)
// }
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
