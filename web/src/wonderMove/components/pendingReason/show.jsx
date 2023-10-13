import PropTypes from 'prop-types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'

const PendingStops = ({ pendingStops }) => {
    const navigate = useNavigate()
    const sortedStops = [...pendingStops].sort((a, b) => b.count - a.count)

    return (
        <>
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
                        {sortedStops.map((row, i) => (
                            <TableRow
                                onClick={() =>
                                    navigate(`details/${row.number}`)
                                }
                                key={i}
                                style={{ cursor: 'pointer' }}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell> {i + 1} </TableCell>
                                <TableCell align="left">{row.number}</TableCell>
                                <TableCell align="left">{row.count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
PendingStops.propTypes = {
    pendingStops: PropTypes.any,
}

export default PendingStops
