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
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
            {dialogAction(handleClose, handleAgree)}
        </Dialog>
    )
}

export default AlertDialog
const dialogAction = (handleClose: () => void, handleAgree: () => void) => {
    return (
        <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAgree} autoFocus>
                Agree
            </Button>
        </DialogActions>
    )
}
