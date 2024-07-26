import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid'
import { FC } from 'react'
import { row } from './gridColumnsAndRowsToAddAdvisory'

export interface grid {
    adjCol: GridColDef<row>[]
    rows: row[]
    checkBox: boolean
    setSelRows?: React.Dispatch<React.SetStateAction<GridRowId[]>>
}

const DataGridTable: FC<grid> = ({ adjCol, rows, checkBox, setSelRows }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <DataGrid
                checkboxSelection={checkBox}
                columns={adjCol}
                rows={rows}
                onRowSelectionModelChange={(ids) => setSelRows && setSelRows(ids)}
                disableRowSelectionOnClick
            />
        </div>
    )
}

export default DataGridTable
