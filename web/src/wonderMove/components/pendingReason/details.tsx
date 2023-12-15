import UpdateReason from './update.tsx'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import { formatDuration, epochToDate } from '../../../commonUtils/epochToTime.ts'
import { useEffect, useState } from 'react'
import { getAllReasons } from '../../services/reason.ts'

interface DetailsListProps {
    pendingDetails: any
}

function getTableHead() {
    return (
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
    )
}

const DetailsList: React.FC<DetailsListProps> = ({ pendingDetails }) => {
    const [fetchReason, setFetchReason] = useState<any>([])

    let sortedDetails = []
    if (pendingDetails && pendingDetails.length > 0) {
        sortedDetails = pendingDetails.slice().sort((a: any, b: any) => a.startTime - b.startTime)
    }
    useEffect(() => {
        getAllReasons().then(setFetchReason)
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {getTableHead()}
                    <TableBody>
                        {sortedDetails &&
                            sortedDetails.map((row: any, i: number) => (
                                <TableRow
                                    key={i}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell> {i + 1} </TableCell>
                                    <TableCell align="left">{epochToDate(row.startTime)}</TableCell>
                                    <TableCell align="left">{epochToDate(row.endTime)}</TableCell>
                                    <TableCell align="left">
                                        {formatDuration(row.durationInMillis)}
                                    </TableCell>
                                    <TableCell align="left">To Be Built</TableCell>
                                    <TableCell align="left">
                                        {<UpdateReason reasonInfo={row} allReasons={fetchReason} />}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default DetailsList
