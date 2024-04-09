import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    TableBody
} from '@mui/material'
import React, { FC, MouseEventHandler } from 'react'
import { NEFTDetailsProps } from './list'

interface neftDialogProps {
    setActivate: React.Dispatch<React.SetStateAction<boolean>>
    NEFTDetails: NEFTDetailsProps[]
    handleDonwloadNEFT: MouseEventHandler<HTMLButtonElement>
}

const NEFTDialog: FC<neftDialogProps> = ({ setActivate, NEFTDetails, handleDonwloadNEFT }) => {
    const [open, setOpen] = React.useState(true)
    let totalAmount = 0
    const descriptionElementRef = React.useRef<HTMLElement>(null)
    const handleClose = () => {
        setActivate(false)
        setOpen(false)
    }
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef
            if (descriptionElement !== null) {
                descriptionElement.focus()
            }
        }
    }, [open])

    const tableHead = [
        'Vehicle Number',
        'Loading - Unloading Point',
        'Type',
        'Invoice Number',
        'Date',
        'Amount'
    ]
    return (
        <Dialog
            maxWidth={'xl'}
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">NEFT File Preview</DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                            <TableHead sx={{ background: '#00000029' }}>
                                <TableRow>
                                    {tableHead.map((name) => (
                                        <TableCell align="center">
                                            {name === 'Loading - Unloading Point' &&
                                            NEFTDetails[0].type === 'fuel pay'
                                                ? 'Location'
                                                : name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {NEFTDetails.map((neft) => (
                                    <TableRow>
                                        <div style={{ display: 'none' }}>
                                            {(totalAmount += neft.payableAmount)}
                                        </div>
                                        <TableCell align="center">{neft.vehicleNumber}</TableCell>
                                        <TableCell align="center">{neft.location}</TableCell>
                                        <TableCell align="center">{neft.type}</TableCell>
                                        <TableCell align="center">{neft.invoiceNumber}</TableCell>
                                        <TableCell align="center">{neft.date}</TableCell>
                                        <TableCell align="center">
                                            <b>{neft.payableAmount}</b>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell align="right" colSpan={5}>
                                        Total Payable Amount
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>{totalAmount}</b>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleDonwloadNEFT}>
                    Generate File
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NEFTDialog
