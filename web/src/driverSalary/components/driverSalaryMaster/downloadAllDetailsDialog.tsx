import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material'
import React, { FC } from 'react'
import { PdfConatiner } from './pdf/pdfConatainer'
import { driverDetailProps } from './types'

export interface driverDialogProps {
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
    tripDetails: driverDetailProps
}

const DriverDialogForAllDetails: FC<driverDialogProps> = ({ setActivateDialog, tripDetails }) => {
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
            if (descriptionElement !== null) descriptionElement.focus()
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
                >
                    {tripDetails.trips !== undefined && <PdfConatiner tripDetails={tripDetails} />}
                </DialogContentText>
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
export default DriverDialogForAllDetails
