import React, { FC } from 'react'
import { dateProps, invoiceValuesProps } from './list'
import { DialogContent, DialogContentText, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface containerProps {
    invoiceValues: invoiceValuesProps
    setInvoiceValues: React.Dispatch<React.SetStateAction<invoiceValuesProps>>
}

export const DialogContentConatiner: FC<containerProps> = ({ invoiceValues, setInvoiceValues }) => {
    return <DialogContent>{TextContainer(invoiceValues, setInvoiceValues)}</DialogContent>
}
type TextContainerProps = (
    invoiceValues: invoiceValuesProps,
    setInvoiceValues: React.Dispatch<React.SetStateAction<invoiceValuesProps>>
) => React.JSX.Element
const TextContainer: TextContainerProps = (invoiceValues: invoiceValuesProps, setInvoiceValues) => {
    return (
        <DialogContentText>
            <br />
            <TextField
                fullWidth
                label="Enter Bill Number"
                value={invoiceValues.billNo}
                onChange={(event) =>
                    setInvoiceValues((data) => {
                        return { ...data, billNo: event.target.value }
                    })
                }
            />
            <br /> <br />
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
        </DialogContentText>
    )
}
