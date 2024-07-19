import DateInput from '../../../form/DateInput'
import { FC } from 'react'
import { formField } from './types'

const PaymentReceivedDateField: FC<formField> = ({ control }) => {
    return (
        <>
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="paymentReceivedDate"
                label="Payment Received Date"
            />
        </>
    )
}

export default PaymentReceivedDateField
