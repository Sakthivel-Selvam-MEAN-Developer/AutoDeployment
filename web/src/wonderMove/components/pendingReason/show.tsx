import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
export interface PendingStop {
    number: string
    _count: number
}
interface Props {
    pendingStops: PendingStop[]
}
const style = { '&:last-child td, &:last-child th': { border: 0 } }
const tableHeadRow = (
    <TableRow>
        <TableCell>#</TableCell>
        <TableCell align="left">Vehicle Number</TableCell>
        <TableCell align="left">Pending Reason</TableCell>
    </TableRow>
)
const tableHead = <TableHead>{tableHeadRow}</TableHead>
const PendingStops: React.FC<Props> = ({ pendingStops }) => {
    const sortedStops = [...pendingStops].sort((a, b) => b._count - a._count)
    return (
        <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
            {table(sortedStops)}
        </TableContainer>
    )
}
export default PendingStops
function table(sortedStops: PendingStop[]) {
    return (
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
            {tableHead}
            <TableBody>{sortedStops.map((row, index) => tableBodyRow(index, row))}</TableBody>
        </Table>
    )
}

function tableBodyRow(index: number, row: PendingStop) {
    return (
        <TableRow key={index} sx={style}>
            <TableCell> {index + 1} </TableCell>
            <TableCell align="left">{row.number}</TableCell>
            <TableCell align="left">{row._count}</TableCell>
        </TableRow>
    )
}
