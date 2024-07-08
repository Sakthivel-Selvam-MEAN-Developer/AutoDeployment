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
    previewPdf: () => void
}
export const InvoiceFieldDialog: FC<FieldDialogProps> = ({
    activateFields,
    setActivateFields,
    previewPdf
}) => {
    const { invoiceValues, setInvoiceValues } = useContext(billNoContext)
    const handleClose = () => {
        setInvoiceValues({ billNo: '', date: 0, depot: '' })
        setActivateFields(false)
    }
    const handleClick = () => {
        if (invoiceValues['billNo'] !== '' && invoiceValues['date'] !== 0) {
            setActivateFields(false)
            previewPdf()
        }
    }
    const handleReject = () => {
        setActivateFields(false)
    }
    return (
        <Dialog open={activateFields} onClose={handleClose} maxWidth={'lg'}>
            <DialogTitle>{'Add Bill Number and Date for Invoice'}</DialogTitle>
            <DialogContentConatiner
                invoiceValues={invoiceValues}
                setInvoiceValues={setInvoiceValues}
            />
            <DialogActions>
                <Button onClick={handleReject}>Cancel</Button>
                <Button onClick={handleClick} autoFocus>
                    Preview
                </Button>
            </DialogActions>
        </Dialog>
    )
}
