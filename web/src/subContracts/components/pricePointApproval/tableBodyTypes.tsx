import { overallTrip, tripDetails } from './types'
export interface FreightAndUnloadingProps {
    trip: tripDetails
    type: string
    editStatus: boolean
}
export interface unloadingProps {
    trip: tripDetails
    type: string
}
export interface cellProps {
    overallTrip: overallTrip
}
