import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Chettinad_Ariyalur from './invoiceFormat/Chettinad/chettinadAriyalur'
import Chettinad_Karikkali_Stock from './invoiceFormat/Chettinad/chettinadKarikali'
import UltraTech_APCW, { UltraTechProps } from './invoiceFormat/UltraTech/ultraTech-APCW'
import { downloadPdf } from './invoiceFormat/downloadPdf'

const InvoiceDialog: React.FC<UltraTechProps> = ({
    tripId,
    company,
    setActivate,
    updateInvoice,
    lastBillNumber
}) => {
    const [open, setOpen] = React.useState(true)
    const handleClose = () => {
        setActivate(false)
        setOpen(false)
    }
    const [loading, setLoading] = React.useState<boolean>(true)

    const descriptionElementRef = React.useRef<HTMLElement>(null)
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef
            if (descriptionElement !== null) {
                descriptionElement.focus()
            }
        }
    }, [open])
    const handleDownload = async () => {
        let companyId
        let annexureId = ''
        switch (company) {
            case 'UltraTech Cements':
                companyId = 'main'
                break
            case 'Chettinad Cements Karikali':
                companyId = 'main_1'
                annexureId = 'main_2'
                break
        }
        if (companyId) {
            const invoiceData: HTMLElement | null = document.getElementById(companyId)
            const annexureData: HTMLElement | null = document.getElementById(annexureId)
            await downloadPdf(invoiceData, annexureData, 'p', 'mm', [1500, 1300], company)
                .then(updateInvoice)
                .then(() => setOpen(false))
        }
    }
    const getContentBasedOnCompany = () => {
        switch (company) {
            case 'UltraTech Cements':
                return (
                    <UltraTech_APCW
                        tripId={tripId}
                        lastBillNumber={lastBillNumber}
                        setLoading={setLoading}
                        loading={loading}
                    />
                )
            case 'Chettinad Cements Karikali':
                return (
                    <Chettinad_Karikkali_Stock
                        tripId={tripId}
                        lastBillNumber={lastBillNumber}
                        setLoading={setLoading}
                        loading={loading}
                    />
                )
            case 'Chettinad Cements Ariyalur':
                return (
                    <Chettinad_Ariyalur
                        tripId={tripId}
                        lastBillNumber={lastBillNumber}
                        setLoading={setLoading}
                        loading={loading}
                    />
                )
        }
    }
    return (
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
                    {getContentBasedOnCompany()}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleClose} variant="outlined" disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleDownload} variant="contained" disabled={loading}>
                    Download PDF
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default InvoiceDialog
