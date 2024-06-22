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
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import dayjs from 'dayjs'

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
                <Button
                    variant="contained"
                    disabled={loading}
                    onClick={async () => {
                        const pdfhtml: HTMLElement | null = document.getElementById('pdf')
                        await downloadPdf(pdfhtml)
                    }}
                >
                    Download PDF
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default DriverDialogForAllDetails
export const downloadPdf = async (pdfHTML: HTMLElement | null) =>
    pdfHTML &&
    (await html2canvas(pdfHTML).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('landscape', 'mm', [2000, 1700])
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        pdf.addImage(imgData, 'png', 0, 0, pdfWidth, pdfHeight)
        pdf.save(`DriverSalary_${dayjs().format('MMMM')}.pdf`)
    }))
