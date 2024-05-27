import { createContext } from 'react'
import { overallTripProps } from '../../types/tripTypes'
interface tripContextProps {
    setTripDetails: React.Dispatch<React.SetStateAction<overallTripProps[]>>
    tripDetails: overallTripProps[]
}
export const tripContext = createContext<tripContextProps>({} as tripContextProps)
