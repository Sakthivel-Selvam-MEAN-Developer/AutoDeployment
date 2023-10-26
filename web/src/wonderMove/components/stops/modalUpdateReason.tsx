import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { epochToDate, formatDuration } from '../epochToTime.ts'
import { Button } from '@mui/material'
import { useState } from 'react'
import * as React from 'react'
import SecondReason from './secondReason.tsx'

interface ModalUpdateReasonProps {
    open: boolean;
    selectedRow: Array<any>;
    setSelectedRow: (row: any) => void;
    tableState: any;
}
const ModalUpdateReason: React.FC<ModalUpdateReasonProps> = ({
    open,
    selectedRow,
    setSelectedRow,
    tableState,
}) => {
    const [expandedRow, setExpandedRow] = useState<any | null>(null)
    let sortedDetails: any
    if (selectedRow && selectedRow.length > 0) {
        sortedDetails = selectedRow
            .slice()
            .sort((a: any, b: any) => a.startTime - b.startTime)
    }
    const handleModalClose = () => setSelectedRow(null)
    const handleAccordionClose = () => {
        setExpandedRow(null)
    }
    const splitStopAccordion = (rowId: number) => {
        setExpandedRow(expandedRow === rowId ? null : rowId)
    }
    const deleteStop = (row: any, index: number) => {
        const rowsWithSameGpsStopId = selectedRow.filter(
            (item) => item.gpsStopId === row.gpsStopId
        )
        const remainingStops = rowsWithSameGpsStopId
            .filter((deleteRow) => deleteRow.id !== row.id)
            .map(({ startTime, endTime, durationInMillis, gpsStopId, stopReasonId }, idx) => {
                console.log('idx = '+ idx,'index = '+ index)

                if (idx === 0 && index === 0) {
                    return {
                        startTime: epochToDate(row.startTime),
                        endTime: epochToDate(endTime),
                        durationInMillis: formatDuration(durationInMillis + row.durationInMillis),
                        gpsStopId,
                        stopReasonId,
                    }
                } else if (idx === 0 && index === 1) {
                    return {
                        startTime: epochToDate(startTime),
                        endTime: epochToDate(row.endTime),
                        durationInMillis: formatDuration(durationInMillis + row.durationInMillis),
                        gpsStopId,
                        stopReasonId,
                    }
                } else if (idx === index - 1 ) {
                    return {
                        startTime: epochToDate(startTime),
                        endTime: epochToDate(row.endTime),
                        durationInMillis: formatDuration(durationInMillis + row.durationInMillis),
                        gpsStopId,
                        stopReasonId,
                    }
                }
                return {
                    startTime: epochToDate(startTime),
                    endTime: epochToDate(endTime),
                    durationInMillis: formatDuration(durationInMillis),
                    gpsStopId,
                    stopReasonId,
                }
            })
        console.log(remainingStops)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Details
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                        >
                            {sortedDetails.map((row: any, index: number) => (
                                <React.Fragment key={row.id}>
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                { border: 0 },
                                        }}>
                                        <TableCell> {index + 1} </TableCell>
                                        <TableCell align="left">
                                            {epochToDate(row.startTime)}
                                        </TableCell>
                                        <TableCell align="left">
                                            {epochToDate(row.endTime)}
                                        </TableCell>
                                        <TableCell align="left">
                                            {formatDuration(
                                                row.durationInMillis
                                            )}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.reason.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button onClick={() => splitStopAccordion(row.id)}> Split </Button>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button data-testid={'delete-button'} onClick={() => deleteStop(row, index)}> Delete </Button>
                                        </TableCell>
                                    </TableRow>
                                    {expandedRow === row.id && (
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                <Typography variant="body1">
                                                    {
                                                        <SecondReason
                                                            row={row}
                                                            onClose={handleAccordionClose}
                                                            tableState={tableState}
                                                            rowWithSameGpsId={selectedRow}
                                                        />
                                                    }
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}
export default ModalUpdateReason
