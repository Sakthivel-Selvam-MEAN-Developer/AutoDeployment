import { TextField } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { FC } from 'react'
import { fieldProps } from './type'
dayjs.extend(utc)
const style = { margin: '20px 0', width: '100%' }
const DialogBillFormField: FC<fieldProps> = ({ setBillDetail }) => {
    return (
        <>
            <TextField
                style={style}
                type="text"
                label="Bill Number"
                variant="outlined"
                onChange={(event) =>
                    setBillDetail((prev) => {
                        return { ...prev, number: event.target.value }
                    })
                }
            />
            <DialogBillDateField setBillDetail={setBillDetail} />
        </>
    )
}
export default DialogBillFormField
interface dateProps {
    $d: number
}
const DialogBillDateField: FC<fieldProps> = ({ setBillDetail }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
            <DatePicker
                sx={{ width: '100%' }}
                label="Invoice Date"
                onChange={(newValue) => {
                    const date = dayjs.utc(dayjs((newValue as unknown as dateProps)?.$d)).unix()
                    setBillDetail((prev) => {
                        return { ...prev, date }
                    })
                }}
            />
        </LocalizationProvider>
    )
}
