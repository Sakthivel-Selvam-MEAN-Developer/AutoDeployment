import { Button } from '@mui/material'
import { FC } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import DateInput from '../../../form/DateInput.tsx'
import SubmitButton from '../../../form/button.tsx'

interface PaymentDueFieldProps {
    setPaymentDueDate: React.Dispatch<React.SetStateAction<number>>
}
export const PaymentDueDateFilter: FC<PaymentDueFieldProps> = ({ setPaymentDueDate }) => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const onSubmit: SubmitHandler<FieldValues> = (data) =>
        setPaymentDueDate(data.paymentDate.unix())
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DateInput
                    control={control}
                    format="DD/MM/YYYY"
                    fieldName="paymentDate"
                    label="Select Payment Date"
                />
                <br />
                <SubmitButton name="Get Dues" type="submit" />
                <Button variant="contained" onClick={() => setValue('paymentDate', null)}>
                    Reset Date
                </Button>
            </form>
        </>
    )
}
