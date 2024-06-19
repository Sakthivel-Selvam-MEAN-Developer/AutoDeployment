import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ChettinadAriyalur from './invoiceFormat/Chettinad/chettinadAriyalur'
import ChettinadKarikkali from './invoiceFormat/Chettinad/chettinadKarikali'
import UltraTechAPCW, { UltraTechProps } from './invoiceFormat/UltraTech/ultraTech-APCW'
import { downloadPdf } from './invoiceFormat/downloadPdf'
import DalmiaDalmiapuramInvoice from './invoiceFormat/Dalmia/dalmiaDalmiapuram'
import DalmiaKadappaInvoice from './invoiceFormat/Dalmia/dalmiaKadapa'
import { billNoContext } from './invoiceContext'
import MahaInvoice from './invoiceFormat/Maha/mahaInvoice'
import Grasim from './invoiceFormat/Grasim/grasim'
import { addresses } from './invoiceFormat/CustomInvoice/address'
import CustomInvoice from './invoiceFormat/CustomInvoice/customInvoice'

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
        let companyTagID = ''
        let annexureTagID = ''
        switch (company) {
            case 'ULTRATECH CEMENT LIMITED,TADIPATRI':
                companyTagID = 'ultratech_main'
                break
            case 'Chettinad Cement Corporation Private Ltd. Ariyalur':
                companyTagID = 'chettinad-ariyalur-section'
                annexureTagID = 'chettinad_annexure_main'
                break
            case 'Chettinad Cement Corporation Private Ltd,Karikkali':
                companyTagID = 'chettinad-karikali-section'
                annexureTagID = 'chettinad_annexure_main'
                break
            case 'Dalmia Cement (Bharat) Limited,Jammalmadugu':
                companyTagID = 'dalmia_kadappa_section'
                annexureTagID = 'dalmia_annexure_section'
                break
            case 'Dalmia Cement (Bharat) Limited,Dalmapuram':
                companyTagID = 'dalmia_dalmiapuram_section'
                annexureTagID = 'dalmia_annexure_section'
                break
            case 'Sree Jayajothi Cement Private Limited (Maha Cement)':
                companyTagID = 'maha-section'
                annexureTagID = 'Maha_annexure_section'
                break
            case 'Grasim Industries Limited,':
                companyTagID = 'ultratech_main'
                break
            case 'ASHTECH(INDIA) PRIVATE LIMITED':
                companyTagID = 'ultratech_main'
                break
            case 'AVD Bricks INC':
                companyTagID = 'ultratech_main'
                break
            case 'Bharathi Cement Corporation Pvt. Ltd':
                companyTagID = 'ultratech_main'
                break
            case 'THE INDIA CEMENT LIMITED':
                companyTagID = 'ultratech_main'
                break
            case 'KRS PROJECT LLP':
                companyTagID = 'ultratech_main'
                break
            case 'PRIME LOGISTICS':
                companyTagID = 'ultratech_main'
                break
            case 'R.K.S TRANSPORTS':
                companyTagID = 'ultratech_main'
                break
            case 'R V N TRANSPORTS':
                companyTagID = 'ultratech_main'
                break
            case 'SMART TRADINGS':
                companyTagID = 'ultratech_main'
                break
            case 'MIOR slags':
                companyTagID = 'ultratech_main'
                break
            case 'Karls Infracon':
                companyTagID = 'ultratech_main'
                break
            case 'Horizon Services':
                companyTagID = 'ultratech_main'
                break
            case 'KPR Transports':
                companyTagID = 'ultratech_main'
                break
            case 'PEGADO FIXING SOLUTIONS PRIVATE LIMITED':
                companyTagID = 'ultratech_main'
                break
        }
        if (companyTagID !== '' && company) {
            const invoiceData: HTMLElement | null = document.getElementById(companyTagID)
            const annexureData: HTMLElement | null = document.getElementById(annexureTagID)
            await downloadPdf(invoiceData, annexureData, company)
                .then(updateInvoice)
                .then(() => setOpen(false))
        }
    }
    const getContentBasedOnCompany = () => {
        switch (company) {
            case 'ULTRATECH CEMENT LIMITED,TADIPATRI':
                return <UltraTechAPCW tripId={tripId} setLoading={setLoading} loading={loading} />
            case 'Chettinad Cement Corporation Private Ltd,Karikkali':
                return (
                    <ChettinadKarikkali tripId={tripId} setLoading={setLoading} loading={loading} />
                )
            case 'Chettinad Cement Corporation Private Ltd. Ariyalur':
                return (
                    <ChettinadAriyalur tripId={tripId} setLoading={setLoading} loading={loading} />
                )
            case 'Dalmia Cement (Bharat) Limited,Jammalmadugu':
                return (
                    <DalmiaKadappaInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                    />
                )
            case 'Dalmia Cement (Bharat) Limited,Dalmapuram':
                return (
                    <DalmiaDalmiapuramInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                    />
                )
            case 'Sree Jayajothi Cement Private Limited (Maha Cement)':
                return <MahaInvoice tripId={tripId} setLoading={setLoading} loading={loading} />
            case 'Grasim Industries Limited,':
                return <Grasim tripId={tripId} setLoading={setLoading} loading={loading} />
            case 'ASHTECH(INDIA) PRIVATE LIMITED':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.ashTech}
                    />
                )
            case 'AVD Bricks INC':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.avdBricksInc}
                    />
                )
            case 'Bharathi Cement Corporation Pvt. Ltd':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.bharathiCement}
                    />
                )
            case 'THE INDIA CEMENT LIMITED':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.theIndiaCement}
                    />
                )
            case 'KRS PROJECT LLP':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.krsProjectLLP}
                    />
                )
            case 'PRIME LOGISTICS':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.primeLogistics}
                    />
                )
            case 'R.K.S TRANSPORTS':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.rksTransports}
                    />
                )
            case 'R V N TRANSPORTS':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.rvnTransports}
                    />
                )
            case 'SMART TRADINGS':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.smartTradings}
                    />
                )
            case 'MIOR slags':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.miorSlags}
                    />
                )
            case 'Karls Infracon':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.karlsInfracon}
                    />
                )
            case 'Horizon Services':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.horizonServices}
                    />
                )
            case 'KPR Transports':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.kprTransports}
                    />
                )
            case 'PEGADO FIXING SOLUTIONS PRIVATE LIMITED':
                return (
                    <CustomInvoice
                        tripId={tripId}
                        setLoading={setLoading}
                        loading={loading}
                        address={addresses.pegaDoFixingSolutions}
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
