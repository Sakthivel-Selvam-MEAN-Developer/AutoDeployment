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
    const [expandedRow, setExpandedRow] = useState(null)
    const handleModalClose = () => setSelectedRow(null)
    const handleAccordionClose = () => {
        setExpandedRow(null)
    }
    const toggleAccordion = (rowId: any) => {
        setExpandedRow(expandedRow === rowId ? null : rowId)
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
            <div>
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
                                {selectedRow.map((row, i) => (
                                    <React.Fragment key={row.id}>
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    {
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
                                                {formatDuration(
                                                    row.durationInMillis
                                                )}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.reason.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button
                                                    onClick={() =>
                                                        toggleAccordion(row.id)
                                                    }
                                                >
                                                    {' '}
                                                    Split{' '}
                                                </Button>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button> Edit </Button>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button> Delete </Button>
                                            </TableCell>
                                        </TableRow>
                                        {expandedRow === row.id && (
                                            <TableRow>
                                                <TableCell colSpan={7}>
                                                    <Typography variant="body1">
                                                        {
                                                            <SecondReason
                                                                row={row}
                                                                onClose={
                                                                    handleAccordionClose
                                                                }
                                                                tableState={
                                                                    tableState
                                                                }
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
            </div>
        </>
    )
}
export default ModalUpdateReason
