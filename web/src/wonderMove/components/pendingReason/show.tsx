import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
interface PendingStop {
    number: string
    _count: number
}
interface Props {
    pendingStops: PendingStop[]
}
const PendingStops: React.FC<Props> = ({ pendingStops }) => {
    const sortedStops = [...pendingStops].sort((a, b) => b._count - a._count)
    return (
        <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Vehicle Number</TableCell>
                        <TableCell align="left">Pending Reason</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedStops.map((row, index) => (
                        <TableRow
                            key={index}
                            style={{ cursor: 'pointer' }}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell> {index + 1} </TableCell>
                            <TableCell align="left">{row.number}</TableCell>
                            <TableCell align="left">{row._count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default PendingStops
