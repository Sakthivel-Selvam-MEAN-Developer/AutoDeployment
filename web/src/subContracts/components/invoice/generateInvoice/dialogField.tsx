import { FC } from 'react'
import { dateProps, invoiceValuesProps } from './list'
import { DialogContent, DialogContentText, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { containerProps, DateFieldProps, TextContainerProps } from './dialogFieldTypes'
import DepotTextField from './getDepotInputField'

export const DialogContentConatiner: FC<containerProps> = ({ invoiceValues, setInvoiceValues }) => {
    return <DialogContent>{TextContainer(invoiceValues, setInvoiceValues)}</DialogContent>
}
const TextContainer: TextContainerProps = (invoiceValues: invoiceValuesProps, setInvoiceValues) => {
    return (
        <DialogContentText>
            <TextField
                style={{ margin: '20px 0' }}
                fullWidth
                label="Enter Bill Number"
                value={invoiceValues.billNo}
                onChange={(event) =>
                    setInvoiceValues((data) => {
                        return { ...data, billNo: event.target.value }
                    })
                }
            />
            <DateField setInvoiceValues={setInvoiceValues} />
            <DepotTextField setInvoiceValues={setInvoiceValues} invoiceValues={invoiceValues} />
        </DialogContentText>
    )
}
const DateField: FC<DateFieldProps> = ({ setInvoiceValues }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
            <DatePicker
                sx={{ width: '100%' }}
                label="Invoice Date"
                onChange={(newValue) => {
                    const date = dayjs.utc(dayjs((newValue as unknown as dateProps)?.$d)).unix()
                    setInvoiceValues((preData) => {
                        return { ...preData, date }
                    })
                }}
            />
        </LocalizationProvider>
    )
}
