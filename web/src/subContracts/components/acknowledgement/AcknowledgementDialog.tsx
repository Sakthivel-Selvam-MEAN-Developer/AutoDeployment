import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'
import { FC, useState } from 'react'
import { DueDateDialogProps } from './addAcknowledgementTypes'
export const DueDateDialog: FC<DueDateDialogProps> = ({ tripClosed }) => {
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
            <DialogContents />
            <DialogActions>
                <Button variant="contained" onClick={handleClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
const DialogContents: FC = () => {
    return (
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Acknowledgement Added Successfully
            </DialogContentText>
        </DialogContent>
    )
}
const DialogBoxTitle: FC = () => {
    return <DialogTitle id="alert-dialog-title">{`Acknowledgement Status:`}</DialogTitle>
}
