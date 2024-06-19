import { overallTrip, tripDetails } from './types'
export interface cellProps {
    trip: tripDetails
    type: string
    editStatus: boolean
    transporterPercentage: number
}
export interface unloadingProps {
    trip: tripDetails
    type: string
}
export interface TableConatinerProps {
    overallTrip: overallTrip
}
