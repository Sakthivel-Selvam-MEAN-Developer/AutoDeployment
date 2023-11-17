import { FC } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

interface SuccessDialogProps {
    open: boolean
    handleClose: () => void
    message: string
}
const SuccessDialog: FC<SuccessDialogProps> = ({ open, handleClose, message }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SuccessDialog
