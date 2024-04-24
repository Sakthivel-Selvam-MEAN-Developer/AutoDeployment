import { Button } from '@mui/material'
import { FC } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import DateInput from '../../../form/DateInput.tsx'
import dayjs from 'dayjs'

interface PaymentDueFieldProps {
    setPaymentDueDate: React.Dispatch<React.SetStateAction<number>>
}
export const PaymentDueDateFilter: FC<PaymentDueFieldProps> = ({ setPaymentDueDate }) => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const onSubmit: SubmitHandler<FieldValues> = (data) =>
        setPaymentDueDate(data.paymentDate.unix())
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'grid', alignItems: 'center', marginBottom: '20px' }}
            >
                <DateInput
                    control={control}
                    format="DD/MM/YYYY"
                    fieldName="paymentDate"
                    label="Select Payment Date"
                />
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
                            setValue('paymentDate', null),
                                setPaymentDueDate(dayjs().startOf('day').unix())
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
