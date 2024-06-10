import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { FC, useContext } from 'react'
import { billNoContext } from './invoiceContext'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { DialogContentConatiner } from './dialogField'
dayjs.extend(utc)
interface FieldDialogProps {
    activateFields: boolean
    setActivateFields: React.Dispatch<React.SetStateAction<boolean>>
    setActivateInvoice: React.Dispatch<React.SetStateAction<boolean>>
}
export const InvoiceFieldDialog: FC<FieldDialogProps> = ({
    activateFields,
    setActivateFields,
    setActivateInvoice
}) => {
    const { invoiceValues, setInvoiceValues } = useContext(billNoContext)
    const handleClose = () => {
        setActivateFields(false)
        setActivateInvoice(true)
    }
    const handleReject = () => {
        setInvoiceValues({ billNo: '', date: 0 })
        setActivateFields(false)
        setActivateInvoice(false)
    }
    return (
        <Dialog open={activateFields} onClose={handleClose} maxWidth={'lg'}>
            <DialogTitle>{'Add Bill Number And Date for Invoice:'}</DialogTitle>
            <DialogContentConatiner
                invoiceValues={invoiceValues}
                setInvoiceValues={setInvoiceValues}
            />
            <DialogActions>
                <Button onClick={handleReject}>Reject</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}
