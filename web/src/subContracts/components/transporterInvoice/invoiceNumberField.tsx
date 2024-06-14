import { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import InvoiceField from './invoiceNumberFieldUtils'

interface InvoiceNumberSearchProps {
    onSearch: (invoiceNumber: string) => void
}
interface FormValues {
    invoiceNumber: string
}
const InvoiceNumberField: FC<InvoiceNumberSearchProps> = ({ onSearch }) => {
    const { handleSubmit, control, setValue } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        onSearch(data.invoiceNumber)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InvoiceField control={control} setValue={setValue} />
            <SubmitButton name="FILTER" type="submit" />
        </form>
    )
}
export default InvoiceNumberField
