import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import { row } from './gridColumnsAndRowsToAddAdvisory'

export interface grid {
    adjCol: GridColDef<row>[]
    rows: row[]
    checkBox: boolean
}

const DataGridTable: FC<grid> = ({ adjCol, rows, checkBox }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <DataGrid
                checkboxSelection={checkBox}
                columns={adjCol}
                rows={rows}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    console.log(newRowSelectionModel)
                }}
                disableRowSelectionOnClick
            />
        </div>
    )
}

export default DataGridTable
