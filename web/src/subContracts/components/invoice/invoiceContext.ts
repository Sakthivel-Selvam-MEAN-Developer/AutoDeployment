import { createContext } from 'react'
import { Nullable } from '../../../types'
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
