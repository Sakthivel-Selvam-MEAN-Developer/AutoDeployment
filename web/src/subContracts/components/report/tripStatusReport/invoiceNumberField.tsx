import { Dispatch, FC, useState, useEffect, ChangeEvent } from 'react'
import { Control } from 'react-hook-form'
import AutoComplete from '../../../../form/AutoComplete'
import { getAllInvoiceNumbers } from '../../../services/unloadingPoint'
import { dispatchType } from './tripStatusReportTypes'

interface InvoiceNumberProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
export const InvoiceNumberField: FC<InvoiceNumberProps> = ({ control, dispatch }) => {
    const [invoiceNumber, setInvoiceNumber] = useState([])
    useEffect(() => {
        getAllInvoiceNumbers().then(setInvoiceNumber)
    }, [])
    return (
        <AutoComplete
            control={control}
            fieldName="invoiceNumber"
            label="Select Invoice Number"
            options={invoiceNumber ? invoiceNumber.map(({ invoiceNumber }) => invoiceNumber) : []}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                dispatch({ invoiceNumber: newValue, type: 'updateInvoiceNumber' })
                dispatch({ pageNumber: 1, type: 'updatePageNumber' })
            }}
        />
    )
}
