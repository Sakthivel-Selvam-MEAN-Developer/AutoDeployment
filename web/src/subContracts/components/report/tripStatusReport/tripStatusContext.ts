import { createContext } from 'react'
import { TripFilters } from '../../../types/tripFilters'

export const filterData = createContext<TripFilters | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dispatchData = createContext<{ dispatch: any }>({ dispatch: { type: '' } })
