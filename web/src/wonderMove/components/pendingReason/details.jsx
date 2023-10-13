import PropTypes from 'prop-types'
import UpdateReason from './update.jsx'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import { formatDuration, epochToDate } from '../EpochConverter.jsx'

const DetailsList = ({ pendingDetails }) => {
    let sortedDetails = []
    if (pendingDetails && pendingDetails.length > 0) {
        sortedDetails = pendingDetails
            .slice()
            .sort((a, b) => a.startTime - b.startTime)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Start Time</TableCell>
                            <TableCell align="left">End Time</TableCell>
                            <TableCell align="left">Duration</TableCell>
                            <TableCell align="left">Location</TableCell>
                            <TableCell align="left">Reason</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedDetails &&
                            sortedDetails.map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell> {i + 1} </TableCell>
                                    <TableCell align="left">
                                        {epochToDate(row.startTime)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {epochToDate(row.endTime)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {formatDuration(row.durationInMillis)}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.gpsStop.latitude},
                                        {row.gpsStop.longitude}
                                    </TableCell>
                                    <TableCell align="left">
                                        {<UpdateReason reasonInfo={row} />}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
DetailsList.propTypes = {
    pendingDetails: PropTypes.any,
}
export default DetailsList
