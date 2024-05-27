import { FC, useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import { getAllInvoiceNumbers } from '../../services/unloadingPoint'
import SubmitButton from '../../../form/button'

interface InvoiceNumberSearchProps {
    onSearch: (invoiceNumber: string) => void
}
interface FormValues {
    invoiceNumber: string
}
const InvoiceNumberField: FC<InvoiceNumberSearchProps> = ({ onSearch }) => {
    const { handleSubmit, control, setValue } = useForm<FormValues>()
    const [invoiceNumbers, setInvoiceNumbers] = useState<string[]>([])
    useEffect(() => {
        getAllInvoiceNumbers().then((data) => {
            setInvoiceNumbers(data.map((item: { invoiceNumber: string }) => item.invoiceNumber))
        })
    }, [])
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        onSearch(data.invoiceNumber)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="invoiceNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        options={invoiceNumbers}
                        onChange={(_event, newValue) => setValue('invoiceNumber', newValue || '')}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Invoice Number" />
                        )}
                        style={{ marginRight: '10px', width: '250px' }}
                    />
                )}
            />
            <SubmitButton name="FILTER" type="submit" />
        </form>
    )
}
export default InvoiceNumberField
