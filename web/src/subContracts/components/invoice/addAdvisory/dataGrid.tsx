import { DataGrid } from '@mui/x-data-grid'
import { FC } from 'react'
import { invoice } from './list'

const DataGridTable: FC<{ invoice: invoice }> = ({ invoice }) => {
    return (
        <div>
            <DataGrid columns={[]} rows={invoice.data} />
        </div>
    )
}

export default DataGridTable
