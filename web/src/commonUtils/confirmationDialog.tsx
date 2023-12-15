import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { FC } from 'react'

interface AlertDialogProps {
    open: boolean
    handleClose: () => void
    handleAgree: () => void
    message: string
}
const AlertDialog: FC<AlertDialogProps> = ({ open, handleClose, handleAgree, message }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleAgree} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog
