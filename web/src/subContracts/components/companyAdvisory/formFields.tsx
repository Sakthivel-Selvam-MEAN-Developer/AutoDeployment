import InvoiceNumberList from './invoiceNumberField'
import ReceivedAmountField from './paymentDetailsFields'
import BankRefNumberField from './BankRefNumberField'
import { invocieList } from './types'
import { FC } from 'react'

const FormFields: FC<invocieList> = ({ control, invoiceList }) => {
    return (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', rowGap: '20px' }}>
            <InvoiceNumberList control={control} invoiceList={invoiceList} />
            <BankRefNumberField control={control} />
            <ReceivedAmountField control={control} />
        </div>
    )
}
export default FormFields
