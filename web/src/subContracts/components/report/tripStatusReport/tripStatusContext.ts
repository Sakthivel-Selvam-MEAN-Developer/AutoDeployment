import { createContext } from 'react'
import { TripFilters } from '../../../types/tripFilters'

export const filterData = createContext<TripFilters | null>(null)
export const dispatchData = createContext<{ dispatch: any }>({ dispatch: { type: '' } })
