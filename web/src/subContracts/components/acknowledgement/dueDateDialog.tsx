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
export const DueDateDialog: FC<DueDateDialogProps> = ({ tripClosed, paymentDetails }) => {
    const [open, setOpen] = useState(tripClosed)
    const handleClose = () => setOpen(false)
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogBoxTitle />
            <DialogContents paymentDetails={paymentDetails} />
            <DialogActions>
                <Button variant="contained" onClick={handleClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
const DialogContents: FC<DialogContentsProps> = ({ paymentDetails }) => {
    return (
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {paymentDetails.dueDate !== undefined ? (
                    <p>
                        The Final Pay Generation Date will be :
                        <b>{epochToMinimalDate(paymentDetails.dueDate)}</b>{' '}
                    </p>
                ) : (
                    <b>TransporterInvoice Not Generated</b>
                )}
            </DialogContentText>
        </DialogContent>
    )
}
const DialogBoxTitle: FC = () => {
    return <DialogTitle id="alert-dialog-title">{`Added Acknowledgement:`}</DialogTitle>
}
