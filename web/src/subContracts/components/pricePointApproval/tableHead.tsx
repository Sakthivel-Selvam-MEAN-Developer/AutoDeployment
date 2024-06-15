import { TableCell, TableRow } from '@mui/material'

const headerName = [
    'Vehicle Number',
    'Start Date',
    'Invoice Number',
    'Transporter',
    'CSM Name',
    'LoadingPoint',
    'UnloadingPoint',
    'Freight Amount',
    'Action'
]
export const GetTableHead = () => {
    return (
        <TableRow>
            {headerName.map((name, index) => {
                return (
                    <TableCell key={index}>
                        <h4>{name}</h4>
                    </TableCell>
                )
            })}
        </TableRow>
    )
}
