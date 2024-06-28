import { TableCell, TableHead, TableRow } from '@mui/material'

const headerName = [
    'Vehicle Number',
    'Start Date',
    'Invoice Number',
    'Transporter',
    'CSM Name',
    'LoadingPoint',
    'UnloadingPoint',
    'Freight Amount',
    'transporter Percentage',
    'transporter Amount',
    'Actions'
]
export const GetTableHead = () => {
    return (
        <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
            <TableRow>
                {headerName.map((name, index) => {
                    return (
                        <TableCell key={index}>
                            <h4>{name}</h4>
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}
