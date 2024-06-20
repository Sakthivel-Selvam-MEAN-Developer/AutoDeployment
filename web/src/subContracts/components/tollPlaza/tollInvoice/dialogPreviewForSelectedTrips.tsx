import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material'
import TollInvoiceBillFormat from './tollInvocieBill'
import TollInvoiceForUntraTech from './tollInvoiceAnnexure'
import TollInvoice from './tollInvoiceForOwn'
import { FC } from 'react'
import { dialogPreview } from '../type'
import DialogActionFields from './dialogActions'
import { tripProp } from './type'

const LineBreak = () => (
    <>
        <br /> <hr /> <br />
    </>
)

const SelectedTripsContent: FC<tripProp> = ({ trips, bill }) => (
    <DialogContent>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <TollInvoiceBillFormat trips={trips} bill={bill} />
            <LineBreak />
            <TollInvoiceForUntraTech trips={trips} />
            <LineBreak />
            <TollInvoice trips={trips} bill={bill} />
        </DialogContentText>
    </DialogContent>
)
const PreviewSelectedTrips: FC<dialogPreview> = ({ trips, setPreDialog, preDialog, bill }) => {
    return (
        <Dialog fullWidth maxWidth={'xl'} open={preDialog}>
            <DialogTitle id="scroll-dialog-title">Invoice - Toll</DialogTitle>
            <SelectedTripsContent trips={trips} bill={bill} />
            <DialogActionFields setDialog={setPreDialog} text={'Download Invoice'} />
        </Dialog>
    )
}
export default PreviewSelectedTrips
