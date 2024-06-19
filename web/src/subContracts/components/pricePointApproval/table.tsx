import { Paper, Table } from '@mui/material'
import { FC } from 'react'
import { overallTrip } from './types'
import { GetTableHead } from './tableHead'
import { TableCellsConatiner } from './tableBody'
interface tabelProps {
    tripDetails: overallTrip[]
}
const PricePointApprovalTable: FC<tabelProps> = ({ tripDetails }) => {
    return (
        <Table sx={{ minWidth: 650 }} component={Paper}>
            <GetTableHead />
            {tripDetails.map((overallTrip) => (
                <TableCellsConatiner key={overallTrip.id} overallTrip={overallTrip} />
            ))}
        </Table>
    )
}
export default PricePointApprovalTable
