import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material'
import React, { FC } from 'react'

export interface driverDialogProps {
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const Driver_Dialog_For_All_Details: FC<driverDialogProps> = ({ setActivateDialog }) => {
    const [open, setOpen] = React.useState(true)
    const handleClose = () => {
        setActivateDialog(false)
        setOpen(false)
    }
    const [loading] = React.useState<boolean>(false)
    const descriptionElementRef = React.useRef<HTMLElement>(null)
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef
            if (descriptionElement !== null) {
                descriptionElement.focus()
            }
        }
    }, [open])
    return (
        <Dialog maxWidth={'xl'} open={open} onClose={handleClose}>
            <DialogTitle id="scroll-dialog-title">User Trip Details</DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                ></DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleClose} variant="outlined" disabled={loading}>
                    Cancel
                </Button>
                <Button variant="contained" disabled={loading}>
                    Download PDF
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Driver_Dialog_For_All_Details
