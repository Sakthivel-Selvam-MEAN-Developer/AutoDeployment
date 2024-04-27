import { Button } from '@mui/material'
import { FC } from 'react'
import { Control, Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

dayjs.extend(utc)
dayjs.extend(timezone)

interface PaymentDueFieldProps {
    setPaymentDueDate: React.Dispatch<React.SetStateAction<string | null>>
    paymentDueDate: string | null
}
export const PaymentDueDateFilter: FC<PaymentDueFieldProps> = ({
    setPaymentDueDate,
    paymentDueDate
}) => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const onSubmit: SubmitHandler<FieldValues> = (data) => setPaymentDueDate(data.paymentDate)
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'grid', alignItems: 'center', marginBottom: '20px' }}
            >
                <DatePickerField paymentDueDate={paymentDueDate} control={control} />
                <br />
                <ButtonWithWrapper setPaymentDueDate={setPaymentDueDate} />
            </form>
        </>
    )
}
interface DatePickerFieldProps {
    paymentDueDate: string | null
    control: Control
}
const DatePickerField: FC<DatePickerFieldProps> = ({ paymentDueDate, control }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
            <Controller
                render={({ field }) => (
                    <DatePicker {...field} label="Select Payment Date" value={paymentDueDate} />
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

const ButtonWithWrapper: React.FC<ButtonsProps> = ({ setPaymentDueDate }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Buttons setPaymentDueDate={setPaymentDueDate} />
        </div>
    )
}
