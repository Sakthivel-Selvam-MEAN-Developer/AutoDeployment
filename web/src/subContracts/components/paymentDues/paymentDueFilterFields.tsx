import { Button } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

interface DatePickerFieldProps {
    paymentDueDate: string | null
    control: Control
}
export const DatePickerField: FC<DatePickerFieldProps> = ({ paymentDueDate, control }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        format="DD/MM/YYYY"
                        label="Select Payment Date"
                        value={paymentDueDate}
                    />
                )}
                name="paymentDate"
                control={control}
            />
        </LocalizationProvider>
    )
}
interface ButtonsProps {
    setPaymentDueDate: React.Dispatch<React.SetStateAction<string | null>>
}
const buttonStyle = { marginLeft: '10px' }
const Buttons: React.FC<ButtonsProps> = ({ setPaymentDueDate }) => {
    return (
        <>
            <Button variant="contained" name="Get Dues" type="submit" sx={buttonStyle}>
                Submit
            </Button>
            <Button variant="contained" onClick={() => setPaymentDueDate(null)} sx={buttonStyle}>
                Reset Date
            </Button>
        </>
    )
}

export const ButtonWithWrapper: React.FC<ButtonsProps> = ({ setPaymentDueDate }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Buttons setPaymentDueDate={setPaymentDueDate} />
        </div>
    )
}
