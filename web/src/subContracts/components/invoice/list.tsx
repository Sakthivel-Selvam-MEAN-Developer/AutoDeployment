import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import FormField from './formField'
import SubmitButton from '../../../form/button'

const InvoiceList: React.FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.companyName === 'UltraTech Cements') console.log('Hi')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField control={control} />
            <SubmitButton name="Generate Invoice" type="submit" />
        </form>
    )
}

export default InvoiceList
