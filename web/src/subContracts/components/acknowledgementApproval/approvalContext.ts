import { createContext } from 'react'
import { overallTripProps } from '../../types/tripTypes'
interface tripContextProps {
    setTripDetails: React.Dispatch<React.SetStateAction<overallTripProps[]>>
    tripDetails: overallTripProps[]
}
interface dataTypes {
    quantity: number
    approvalStatus: boolean
}
interface fieldDataProps {
    setFieldValues: React.Dispatch<React.SetStateAction<dataTypes>>
    fieldValues: dataTypes
}
export const tripContext = createContext<tripContextProps>({} as tripContextProps)
export const fieldData = createContext<fieldDataProps>({} as fieldDataProps)
