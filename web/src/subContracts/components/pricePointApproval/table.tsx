import { Paper, Table, TableContainer } from '@mui/material'
import { FC } from 'react'
import { overallTrip } from './types'
import { GetTableHead } from './tableHead'
import { TableCellsConatiner } from './tableBody'
interface tabelProps {
    tripDetails: overallTrip[]
}
const PricePointApprovalTable: FC<tabelProps> = ({ tripDetails }) => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
            <Table stickyHeader sx={{ minWidth: 650 }}>
                <GetTableHead />
                {tripDetails.map((overallTrip) => (
                    <TableCellsConatiner key={overallTrip.id} overallTrip={overallTrip} />
                ))}
            </Table>
        </TableContainer>
    )
}
export default PricePointApprovalTable
