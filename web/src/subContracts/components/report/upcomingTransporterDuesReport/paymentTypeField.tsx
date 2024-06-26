import React, { ChangeEvent } from 'react'
import { Control } from 'react-hook-form'
import AutoComplete from '../../../../form/AutoComplete'

interface PaymentTypeFieldProps {
    control: Control
    setPaymentType: React.Dispatch<React.SetStateAction<string>>
}

export const PaymentTypeField: React.FC<PaymentTypeFieldProps> = ({ control, setPaymentType }) => {
    return (
        <AutoComplete
            control={control}
            fieldName="paymentType"
            label="Select Payment Type"
            data-testid={'select-payment-type'}
            options={['Final Pay', 'Initial Pay', 'GST Pay']}
            onChange={(_e: ChangeEvent<HTMLInputElement>, newValue: string) => {
                setPaymentType(newValue)
            }}
        />
    )
}
