import PropTypes from 'prop-types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import AddReason from './addReason'
import { formatDuration, epochToDate } from '../EpochConverter.jsx'
import EditIcon from '@mui/icons-material/Edit'
import { useState, useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ModalUpdateReason from './modalUpdateReason.jsx'
import { getAllReasons } from '../../services/reason.js'

const StopList = ({ stopDetails, tableState }) => {
    const [selectedRow, setSelectedRow] = useState(null)
    const [allReasons, setAllReasons] = useState([])

    useEffect(() => {
        getAllReasons().then(setAllReasons)
    }, [])
    const handleEditClick = (row) => {
        const rowsWithSameGpsStopId = stopDetails.filter(
            (item) => item.gpsStop.id === row.gpsStop.id
        )
        setSelectedRow(rowsWithSameGpsStopId)
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
                            <TableCell align="left">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stopDetails.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell> {index + 1} </TableCell>
                                <TableCell align="left">
                                    {epochToDate(row.startTime)}
                                </TableCell>
                                <TableCell align="left">
                                    {epochToDate(row.endTime)}
                                </TableCell>
                                <TableCell align="left">
                                    {formatDuration(row.durationInMillis)}
                                </TableCell>
                                <TableCell align="left">To Be Built</TableCell>
                                <TableCell align="left">
                                    {
                                        <AddReason
                                            stopInfo={row}
                                            allReasons={allReasons}
                                        />
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    <Tooltip title="Split Stops">
                                        <IconButton>
                                            <EditIcon
                                                onClick={() =>
                                                    handleEditClick(row)
                                                }
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedRow && (
                <ModalUpdateReason
                    selectedRow={selectedRow}
                    open={open}
                    setSelectedRow={setSelectedRow}
                    tableState={tableState}
                />
            )}
        </>
    )
}
StopList.propTypes = {
    stopDetails: PropTypes.any,
    tableState: PropTypes.any,
}

export default StopList
