import { FC } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

interface SuccessDialogProps {
    open: boolean
    handleClose: () => void
    message: string
}
const SuccessDialog: FC<SuccessDialogProps> = ({ open, handleClose, message }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
            {okButton(handleClose)}
        </Dialog>
    )
}

export default SuccessDialog
const okButton = (handleClose: () => void) => {
    return (
        <DialogActions>
            <Button data-testid={'ok-button'} onClick={handleClose} autoFocus>
                Ok
            </Button>
        </DialogActions>
    )
}
