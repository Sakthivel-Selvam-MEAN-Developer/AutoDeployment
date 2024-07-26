import { createContext } from 'react'
export interface contextProps {
    filterData: filterDataProps
    setFilterData: React.Dispatch<React.SetStateAction<filterDataProps>>
}
export interface filterDataProps {
    pageName: string
    startDate: number
    endDate: number
    cementCompany: { id: number | undefined; name: string | undefined }
    pageNumber: number
    received: boolean | undefined
    GSTReceived: boolean | undefined
}
export const invoiceFilterData = createContext<contextProps>({} as contextProps)
interface billNoContextProps {
    setInvoiceValues: React.Dispatch<React.SetStateAction<invoiceValuesProps>>
    invoiceValues: invoiceValuesProps
}
export const billNoContext = createContext<billNoContextProps>({} as billNoContextProps)
export interface invoiceValuesProps {
    billNo: string
    date: number
}
