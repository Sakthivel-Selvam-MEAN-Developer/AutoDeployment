import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

interface PDFDialogProps {
    open: boolean
    onClose: () => void
    pdfLink: string
}
const PDFDialog: React.FC<PDFDialogProps> = ({ open, onClose, pdfLink }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle color="primary">PDF File</DialogTitle>
            <DialogContent>
                <iframe src={pdfLink} width="100%" height="500px" title="PDF File" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default PDFDialog
