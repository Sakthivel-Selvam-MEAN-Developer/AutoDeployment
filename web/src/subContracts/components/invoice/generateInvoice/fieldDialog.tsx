import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { FC, useContext } from 'react'
import { billNoContext, invoiceFilterData } from './invoiceContext'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { DialogContentConatiner } from './dialogField'
import { tripProp } from './dataGridColumnsAndRows'
dayjs.extend(utc)

interface FieldDialogProps {
    activateFields: boolean
    setActivateFields: React.Dispatch<React.SetStateAction<boolean>>
    previewPdf: () => void
    quantityType: tripProp
}
export const InvoiceFieldDialog: FC<FieldDialogProps> = ({
    activateFields,
    setActivateFields,
    previewPdf,
    quantityType
}) => {
    const { invoiceValues, setInvoiceValues } = useContext(billNoContext)
    const { filterData } = useContext(invoiceFilterData)
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
            <DialogTitle>
                <h4 style={{ margin: 0 }}>{'Add Bill Number and Date for Invoice'}</h4>
                <h6 style={{ color: '#FF5733', margin: 0 }}>
                    NOTE:{filterData.cementCompany.name},
                    {quantityType &&
                        (quantityType.loadingPoint?.cementCompany.quantityType ??
                            quantityType.stockPoint?.cementCompany.quantityType)}
                </h6>
            </DialogTitle>
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
