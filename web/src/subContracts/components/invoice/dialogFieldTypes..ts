import { invoiceValuesProps } from './list'

export interface DateFieldProps {
    setInvoiceValues: React.Dispatch<React.SetStateAction<invoiceValuesProps>>
}
export type TextContainerProps = (
    invoiceValues: invoiceValuesProps,
    setInvoiceValues: React.Dispatch<React.SetStateAction<invoiceValuesProps>>
) => React.JSX.Element
export interface containerProps {
    invoiceValues: invoiceValuesProps
    setInvoiceValues: React.Dispatch<React.SetStateAction<invoiceValuesProps>>
}
