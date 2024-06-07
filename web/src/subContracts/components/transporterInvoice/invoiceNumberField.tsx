import { FC, useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import { getTripByTransporterInvoice } from '../../services/transporterInvoice'
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
        getTripByTransporterInvoice('').then((data) => {
            const invoiceNumbersList: string[] = []
            data.forEach((item: any) => {
                if (item.loadingPointToStockPointTrip?.invoiceNumber) {
                    invoiceNumbersList.push(item.loadingPointToStockPointTrip.invoiceNumber)
                }
                if (item.loadingPointToUnloadingPointTrip?.invoiceNumber) {
                    invoiceNumbersList.push(item.loadingPointToUnloadingPointTrip.invoiceNumber)
                }
            })
            setInvoiceNumbers(invoiceNumbersList)
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
