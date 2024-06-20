import { FC, useEffect, useState } from 'react'
import { Controller, Control, UseFormSetValue } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import { getTripByTransporterInvoice } from '../../services/transporterInvoice'

interface FormValues {
    invoiceNumber: string
}
interface InvoiceAutocompleteProps {
    control: Control<FormValues>
    setValue: UseFormSetValue<FormValues>
}
const InvoiceField: FC<InvoiceAutocompleteProps> = ({ control, setValue }) => {
    const [invoiceNumbers, setInvoiceNumbers] = useState<string[]>([])
    useEffect(() => {
        getTripByTransporterInvoice('').then((data) => {
            const invoiceNumbersList: string[] = []
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    return (
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
    )
}
export default InvoiceField
