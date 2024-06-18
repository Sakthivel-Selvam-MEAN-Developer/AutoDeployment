import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { alignedtrip } from './type'
// import * as XLSX from 'xlsx'
// import TollInvoiceForUntraTech from './tollInvoice/tollInvoiceFormatForUltratech'
// import saveAs from 'file-saver'
// import { downloadPdfForUltraTech } from '../invoice/invoiceFormat/downloadPdf'

interface gridProps {
    row: alignedtrip[]
    column: GridColDef[]
}

const handleClick = async () => {
    // const data = document.getElementById('toll-invoice-format') as HTMLElement
    // await downloadPdfForUltraTech(data, 'landscape', 'mm', [3500, 1300], 'Toll')
    // const worksheet = XLSX.utils.table_to_sheet(data)
    // const workbook = XLSX.utils.book_new()
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    // const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    // saveAs(blob, `toll.xlsx`)
}
const TripsDataGrid: React.FC<gridProps> = ({ row, column }) => {
    return (
        <div>
            <DataGrid
                columns={column}
                rows={row}
                onRowSelectionModelChange={() => handleClick()}
                checkboxSelection
                disableRowSelectionOnClick
                hideFooterPagination
            />
            {/* <TollInvoiceForUntraTech /> */}
        </div>
    )
}

export default TripsDataGrid
