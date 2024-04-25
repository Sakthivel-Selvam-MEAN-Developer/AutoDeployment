import { Button } from '@mui/material'
import { FC } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
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
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data.paymentDate)
        setPaymentDueDate(data.paymentDate)
    }
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'grid', alignItems: 'center', marginBottom: '20px' }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
                    <Controller
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                label="Select Payment Date"
                                value={paymentDueDate}
                            />
                        )}
                        name="paymentDate"
                        control={control}
                    />
                </LocalizationProvider>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        name="Get Dues"
                        type="submit"
                        sx={{ marginLeft: '10px' }}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setPaymentDueDate(null)
                        }}
                        sx={{ marginLeft: '10px' }}
                    >
                        Reset Date
                    </Button>
                </div>
            </form>
        </>
    )
}
