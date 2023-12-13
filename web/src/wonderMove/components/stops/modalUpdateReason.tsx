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
import { deleteStop } from './deleteStops.ts'
import { overrideStop } from '../../services/stops.ts'
import AlertDialog from '../confirmationDialog.tsx'

interface Row {
    id: number
    gpsStopId: number
    stopReasonId: number
    startTime: number
    endTime: number
    durationInMillis: number
    reason: {
        id: number
        name: string
    }
}
interface ModalUpdateReasonProps {
    open: boolean
    selectedRow: Array<any>
    setSelectedRow: any
    tableState: () => void
}
const ModalUpdateReason: React.FC<ModalUpdateReasonProps> = ({
    open,
    selectedRow,
    setSelectedRow,
    tableState
}) => {
    const [expandedRow, setExpandedRow] = useState<any | null>(null)
    const [remainingStop, setRemainingStop] = useState<any>()
    const [openAlertDialog, setOpenAlertDialog] = useState(false)
    const [gpsStopId, setGpsStopId] = useState<any>()
    let sortedRows: any
    if (selectedRow && selectedRow.length > 0) {
        sortedRows = selectedRow.slice().sort((a: Row, b: Row) => a.startTime - b.startTime)
    }
    const handleModalClose = () => setSelectedRow(null)
    const handleAccordionClose = () => {
        setExpandedRow(null)
    }
    const splitStopAccordion = (rowId: number) => {
        setExpandedRow(expandedRow === rowId ? null : rowId)
    }
    const handleDeleteClick = (row: Row, index: number) => {
        const updatedStops = deleteStop(row, index, sortedRows)
        setRemainingStop(updatedStops)
        setGpsStopId(row.gpsStopId)
        setOpenAlertDialog(true)
    }
    const handleAgree = () => {
        overrideStop(gpsStopId, remainingStop)
            .then(() => {
                setOpenAlertDialog(false)
                tableState()
            })
            .catch(() => {
                setOpenAlertDialog(false)
                alert("Can't able to delete")
            })
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
        p: 4
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
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Details
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            {sortedRows.map((row: Row, index: number) => (
                                <React.Fragment key={row.id}>
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                                        <TableCell align="left">{row.reason.name}</TableCell>
                                        <TableCell align="left">
                                            <Button onClick={() => splitStopAccordion(row.id)}>
                                                {' '}
                                                Split{' '}
                                            </Button>
                                        </TableCell>
                                        {sortedRows.length > 1 && (
                                            <TableCell align="left">
                                                <Button
                                                    onClick={() => handleDeleteClick(row, index)}
                                                >
                                                    {' '}
                                                    Delete{' '}
                                                </Button>
                                            </TableCell>
                                        )}
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
                                                            rowWithSameGpsId={sortedRows}
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
            <AlertDialog
                open={openAlertDialog}
                handleClose={() => setOpenAlertDialog(false)}
                handleAgree={handleAgree}
                message={'Want to delete the stop...'}
            />
        </>
    )
}
export default ModalUpdateReason
