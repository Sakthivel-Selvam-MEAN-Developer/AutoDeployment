import { createContext } from 'react'
import { fuelFilters } from '../../../../types/fuelFilters'

export const filterData = createContext<fuelFilters | null>(null)
export const dispatchData = createContext<{ dispatch: any }>({ dispatch: { type: '' } })
