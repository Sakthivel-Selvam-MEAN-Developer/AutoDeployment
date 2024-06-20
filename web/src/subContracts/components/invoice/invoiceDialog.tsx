import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { downloadPdf } from './invoiceFormat/downloadPdf'
import { billNoContext } from './invoiceContext'
import { UltraTechProps } from './invoiceFormat/CustomInvoice/customInvoice'
import { companyConfig } from './companyConfig'

const InvoiceDialog: React.FC<UltraTechProps> = ({
    tripId,
    company,
    setActivate,
    updateInvoice
}) => {
    const [open, setOpen] = React.useState(true)
    const { setInvoiceValues } = React.useContext(billNoContext)
    const handleClose = () => {
        setActivate(false)
        setOpen(false)
        setInvoiceValues({ billNo: '', date: 0 })
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
        if (company && companyConfig[company]) {
            const { companyTagID, annexureTagID } = companyConfig[company]
            const invoiceData: HTMLElement | null = document.getElementById(companyTagID)
            const annexureData: HTMLElement | null = document.getElementById(annexureTagID || '')
            await downloadPdf(invoiceData, annexureData, company)
                .then(updateInvoice)
                .then(() => setOpen(false))
        }
    }

    const getContentBasedOnCompany = () => {
        if (company && companyConfig[company]) {
            const { component: Component, address } = companyConfig[company]
            return (
                <Component
                    tripId={tripId}
                    setLoading={setLoading}
                    loading={loading}
                    address={address}
                />
            )
        }
        return null
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
