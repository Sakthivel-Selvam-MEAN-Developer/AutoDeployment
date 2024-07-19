import PaymentReceivedDateField from './paymentDetailsFields'
import BankRefNumberField from './BankRefNumberField'
import { invoiceList } from './types'
import { FC } from 'react'
import { Button } from '@mui/material'

export const SubmitButton: FC<{ name: string }> = ({ name }) => {
    return (
        <Button type="submit" variant="contained">
            {name}
        </Button>
    )
}
const style = { display: 'flex', gap: '20px', rowGap: '20px', alignItems: 'center' }
const FormFields: FC<{ control: invoiceList['control'] }> = ({ control }) => {
    return (
        <div style={{ ...style, flexWrap: 'wrap' }}>
            <BankRefNumberField control={control} />
            <PaymentReceivedDateField control={control} />
            <SubmitButton name={'Create'} />
        </div>
    )
}
export default FormFields
