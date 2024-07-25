import { DataGrid } from '@mui/x-data-grid'
import { FC } from 'react'
import { invoice } from './list'
import { columns, getRows, row } from './gridColumnsAndRows'
import { update } from './addAdvisory'
import { getAmt, getAmtBill } from './shortageFormFields'
import { Button } from '@mui/material'
import { updateShortageDetails } from '../../../services/viewInvoice'

export interface grid {
    invoice: invoice
    setUpdate: React.Dispatch<React.SetStateAction<update>>
    update: update
    onFilter: () => void
}

const DataGridTable: FC<grid> = ({ invoice, setUpdate, update, onFilter }) => {
    const height = { height: '20px' }
    const adjestedColumns = columns.map((column: { field: string }) => {
        return {
            ...column,
            renderCell: (params: { row: row }) => {
                if (column.field === 'shortageAmount') return getAmt(height, setUpdate, update)
                else if (column.field === 'shortageBillNo')
                    return getAmtBill(height, setUpdate, update)
                else if (column.field === 'action')
                    return (
                        <Button
                            variant="contained"
                            onClick={async () => {
                                await updateShortageDetails({
                                    ...update,
                                    invoiceId: params.row.id
                                }).then(onFilter)
                            }}
                        >
                            Add
                        </Button>
                    )
            }
        }
    })
    return (
        <div style={{ marginTop: '20px' }}>
            <DataGrid columns={adjestedColumns} rows={getRows(invoice.data)} />
        </div>
    )
}

export default DataGridTable
