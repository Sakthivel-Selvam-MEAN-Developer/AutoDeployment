import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'
import { FC, useState } from 'react'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { DialogContentsProps, DueDateDialogProps } from './addAcknowledgementTypes'
const DueDateDialog: FC<DueDateDialogProps> = ({ tripClosed, paymentDetails }) => {
    const [open, setOpen] = useState(tripClosed)
    const handleClose = () => setOpen(false)
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogBoxTitle paymentDetails={paymentDetails} />
            <DialogContents paymentDetails={paymentDetails} />
            <DialogActions>
                <Button variant="contained" onClick={handleClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default DueDateDialog
const DialogContents: FC<DialogContentsProps> = ({ paymentDetails }) => {
    return (
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                The Final Pay Generation Date will be :
                <b>{epochToMinimalDate(paymentDetails.dueDate)}</b>
            </DialogContentText>
        </DialogContent>
    )
}
const DialogBoxTitle: FC<DialogContentsProps> = ({ paymentDetails }) => {
    return (
        <DialogTitle id="alert-dialog-title">
            {`Due Date for vehicle : ${paymentDetails.vehicleNumber}`}
        </DialogTitle>
    )
}
