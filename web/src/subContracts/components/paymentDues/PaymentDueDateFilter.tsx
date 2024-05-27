// import { Button } from '@mui/material'
import { FC } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { DatePickerField, ButtonWithWrapper } from './paymentDueFilterFields'

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
