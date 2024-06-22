import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material'
import { FC } from 'react'
import { dialogPreview } from '../type'
import DialogActionFields from './dialogActions'
import { tripProp } from './type'
import TollInvoiceBillFormat from './invoiceFormat/tollInvocieBill'
import TollInvoiceForUntraTech from './invoiceFormat/tollInvoiceAnnexure'
import TollInvoice from './invoiceFormat/tollInvoiceForOwn'
import { downloadPDF } from './invoiceFormat/downloadFormat'
const SelectedTripsContent: FC<tripProp> = ({ trips, bill }) => {
    return (
        <DialogContent>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                <TollInvoiceBillFormat trips={trips} bill={bill} />
                <hr style={{ margin: '20px 0' }} />
                <TollInvoiceForUntraTech trips={trips} bill={bill} />
                <hr style={{ margin: '20px 0' }} />
                <TollInvoice trips={trips} bill={bill} />
            </DialogContentText>
        </DialogContent>
    )
}
const PreviewSelTrips: FC<dialogPreview> = ({
    trips,
    setPreDialog,
    preDialog,
    bill,
    setLoad,
    reload
}) => {
    return (
        <>
            <Dialog fullWidth maxWidth={'xl'} open={preDialog}>
                <DialogTitle id="scroll-dialog-title">Invoice - Toll</DialogTitle>
                <SelectedTripsContent trips={trips} bill={bill} />
                <DialogActionFields
                    setDialog={setPreDialog}
                    text={'Download Invoice'}
                    handleClick={() =>
                        downloadPDF(trips, bill, setLoad, setPreDialog, preDialog, reload)
                    }
                />
            </Dialog>
        </>
    )
}
export default PreviewSelTrips
