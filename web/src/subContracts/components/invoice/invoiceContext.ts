import { createContext } from 'react'
import { Nullable } from '../../../types'
import { invoiceValuesProps } from './list'
export interface contextProps {
    filterData?: Nullable<filterDataProps>
    setFilterData?: React.Dispatch<React.SetStateAction<Nullable<filterDataProps>>>
}
export interface filterDataProps {
    pageName: string
    startDate: number
    endDate: number
    cementCompanyName: string
}
export const invoiceFilterData = createContext<Nullable<contextProps | any>>(null)
interface billNoContextProps {
    setInvoiceValues: React.Dispatch<React.SetStateAction<invoiceValuesProps>>
    invoiceValues: invoiceValuesProps
}
export const billNoContext = createContext<billNoContextProps>({} as billNoContextProps)
