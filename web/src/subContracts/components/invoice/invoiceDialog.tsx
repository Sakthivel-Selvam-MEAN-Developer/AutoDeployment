import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import jsPDF from 'jspdf'
import UltraTech_APCW, { UltreaTechProps } from './invoiceFormat/UltraTech/ultraTech-APCW'
import html2canvas from 'html2canvas'

const InvoiceDialog: React.FC<UltreaTechProps> = ({ tripId, company }) => {
    const [open, setOpen] = React.useState(true)
    const handleClose = () => {
        setOpen(false)
    }
    const descriptionElementRef = React.useRef<HTMLElement>(null)
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef
            if (descriptionElement !== null) {
                descriptionElement.focus()
            }
        }
    }, [open])
    const handleDownload = () => {
        const data: HTMLElement | null = document.getElementById('main')
        if (data !== null)
            html2canvas(data).then((canvas) => {
                const imgData = canvas.toDataURL('image/png')
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: [1500, 1300]
                })
                const pdfWidth = pdf.internal.pageSize.getWidth()
                const pdfHeight = pdf.internal.pageSize.getHeight()
                pdf.addImage(imgData, 'png', 0, 0, pdfWidth, pdfHeight)
                pdf.save(`Invoice-${company}.pdf`)
            })
    }
    return (
        <React.Fragment>
            <Dialog
                maxWidth={'xl'}
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Invoice - {company}</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <UltraTech_APCW tripId={tripId} company={company} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDownload}>Download</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
export default InvoiceDialog
