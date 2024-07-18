import { FC } from 'react'
import InputWithType from '../../../form/InputWithType'
import { formField } from './types'

const BankRefNumberField: FC<formField> = ({ control }) => {
    return (
        <>
            <InputWithType
                control={control}
                label="Bank Reference Number"
                fieldName="bankRefenrenceName"
                type="string"
            />
            <PaymentDocNumber control={control} />
        </>
    )
}

export default BankRefNumberField

const PaymentDocNumber: FC<formField> = ({ control }) => {
    return (
        <InputWithType
            control={control}
            label="Payment Document Number"
            fieldName="paymentDocumentNumber"
            type="string"
        />
    )
}
