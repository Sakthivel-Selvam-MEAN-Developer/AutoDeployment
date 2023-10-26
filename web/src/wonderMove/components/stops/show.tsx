import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import AddReason from './addReason.js'
import { formatDuration, epochToDate } from '../epochToTime.ts'
import EditIcon from '@mui/icons-material/Edit'
import { useState, useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ModalUpdateReason from './modalUpdateReason.tsx'
import { getAllReasons } from '../../services/reason.js'

interface StopDetails {
    id: number;
    startTime: number;
    endTime: number;
    durationInMillis: number;
    gpsStop: {
        id: number;
    };
}
interface StopListProps {
    stopDetails: StopDetails[];
    tableState: any;
}
const StopList: React.FC<StopListProps> = ({ stopDetails, tableState }) => {
    const [selectedRows, setSelectedRows] = useState(null)
    const [allReasons, setAllReasons] = useState([])

    useEffect(() => {
        // @ts-ignore
        getAllReasons().then(setAllReasons)
    }, [])

    let sortedDetails: any = []
    if (stopDetails && stopDetails.length > 0) {
        sortedDetails = stopDetails
            .slice()
            .sort((a: any, b: any) => a.startTime - b.startTime)
    }
    const handleEditClick = (row: StopDetails) => {
        const rowsWithSameGpsStopId = stopDetails.filter(
            (item) => item.gpsStop.id === row.gpsStop.id
        )
        setSelectedRows(rowsWithSameGpsStopId as any)
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
                        {sortedDetails.map((row: any, index: number) => (
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
                                        <IconButton onClick={() => handleEditClick(row)}>
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedRows && (
                <ModalUpdateReason
                    key={tableState}
                    selectedRow={selectedRows}
                    open={open as any}
                    setSelectedRow={setSelectedRows}
                    tableState={tableState}
                />
            )}
        </>
    )
}

export default StopList
