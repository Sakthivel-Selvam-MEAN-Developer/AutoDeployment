import { DataGrid } from '@mui/x-data-grid'
import { alignRowDetails, columns } from './gridColumnsAndRows'
import { Box } from '@mui/material'
import { accType, bunkDetailsProps } from '../addBunk/types'
import { FC } from 'react'

interface gridProp {
    bunkList: bunkDetailsProps[]
    accTypes: accType[]
}

const BunkDataGrid: FC<gridProp> = ({ bunkList, accTypes }) => {
    const rows = alignRowDetails(bunkList, accTypes)
    return (
        <Box sx={{ height: 490 }}>
            <DataGrid columns={columns} rows={rows} hideFooter />
        </Box>
    )
}

export default BunkDataGrid
