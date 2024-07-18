import InputWithType from '../../../form/InputWithType'
import DateInput from '../../../form/DateInput'
import { FC } from 'react'
import { formField } from './types'

const ReceivedAmountField: FC<formField> = ({ control }) => {
    return (
        <>
            <PaymentReceivedDate control={control} />
            <InputWithType
                control={control}
                label="Received Amount"
                fieldName="receivedAmount"
                type="number"
            />
        </>
    )
}

export default ReceivedAmountField

const PaymentReceivedDate: FC<formField> = ({ control }) => {
    return (
        <DateInput
            control={control}
            format="DD/MM/YYYY"
            fieldName="receivedDate"
            label="Payment Received Date"
        />
    )
}
