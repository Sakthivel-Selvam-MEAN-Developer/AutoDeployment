import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { alignRowDetails, columns } from './gridColumnsAndRows'
import { Box, Button } from '@mui/material'
import { accType, bunkDetailsProps } from '../addBunk/types'
import { FC } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote'

interface gridProp {
    bunkList: bunkDetailsProps[]
    accTypes: accType[]
    handleEdit: (row: bunkDetailsProps) => void
}

const BunkDataGrid: FC<gridProp> = ({ bunkList, accTypes, handleEdit }) => {
    const rows = alignRowDetails(bunkList, accTypes)
    const adjustedColumns: GridColDef[] = getAdjestedColumns(handleEdit)
    return (
        <Box sx={{ height: 490 }}>
            <DataGrid columns={adjustedColumns} rows={rows} hideFooter />
        </Box>
    )
}

export default BunkDataGrid

const getAdjestedColumns = (handleEdit: (row: bunkDetailsProps) => void): GridColDef[] => {
    return columns.map((column) => ({
        ...column,
        renderCell: (params) => {
            if (column.field === 'actions') {
                return (
                    <Button onClick={() => handleEdit(params.row)} color="warning">
                        <EditNoteIcon />
                    </Button>
                )
            }
            return params.value
        }
    }))
}
