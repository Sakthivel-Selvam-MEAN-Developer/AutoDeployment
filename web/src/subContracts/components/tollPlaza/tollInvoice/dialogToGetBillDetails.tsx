import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material'
import DialogBillFormField from './fieldDialog'
import { FC } from 'react'
import { fieldProps, prop } from './type'
import DialogActionFields from './dialogActions'

const FieldContent: FC<fieldProps> = ({ setBillDetail }) => {
    return (
        <DialogContent>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                <DialogBillFormField setBillDetail={setBillDetail} />
            </DialogContentText>
        </DialogContent>
    )
}
const BillDetailsDialog: FC<prop> = ({ fieldDialog, setDialog, setPreDialog, setBill, bill }) => {
    const handleNext = () => {
        if (bill.number === '' || bill.date === 0) return
        setDialog(false)
        setPreDialog(true)
    }
    return (
        <Dialog fullWidth maxWidth={'xs'} open={fieldDialog}>
            <DialogTitle id="scroll-dialog-title">Toll Invoice</DialogTitle>
            <FieldContent setBillDetail={setBill} />
            <DialogActionFields setDialog={setDialog} handleClick={handleNext} text={'Next'} />
        </Dialog>
    )
}
export default BillDetailsDialog
