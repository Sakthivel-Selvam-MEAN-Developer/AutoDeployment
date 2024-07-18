import { ChangeEvent, FC } from 'react'
import AutoComplete from '../../../form/AutoComplete'
import { invocieList } from './types'

const InvoiceNumberList: FC<invocieList> = ({ control, invoiceList }) => {
    return (
        <AutoComplete
            control={control}
            fieldName="invoiceList"
            label="Invoice Number"
            options={invoiceList && invoiceList.map((invoice) => invoice.name)}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                console.log(newValue)
            }}
        />
    )
}

export default InvoiceNumberList
