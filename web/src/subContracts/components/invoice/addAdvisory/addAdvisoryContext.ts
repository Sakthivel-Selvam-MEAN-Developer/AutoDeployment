import { createContext } from 'react'
export interface advisoryContextProps {
    filterData: filterDataProps
    setFilterData: React.Dispatch<React.SetStateAction<filterDataProps>>
}
export interface filterDataProps {
    startDate: number
    endDate: number
    cementCompany: { id: number | undefined; name: string | undefined }
    pageNumber: number
}
export const advisoryFilterData = createContext<advisoryContextProps>({} as advisoryContextProps)
