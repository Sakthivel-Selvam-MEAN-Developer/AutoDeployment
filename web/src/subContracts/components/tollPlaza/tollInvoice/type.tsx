import { overallTrip, trip } from '../type'
import { props } from './alignTripDetails'

export interface prop {
    trips: props['trip']
    fieldDialog: boolean
    setDialog: React.Dispatch<React.SetStateAction<boolean>>
    setPreDialog: React.Dispatch<React.SetStateAction<boolean>>
    setBill: React.Dispatch<React.SetStateAction<{ number: string; date: number }>>
    bill: { number: string; date: number }
}
export interface fieldProps {
    setBillDetail: React.Dispatch<React.SetStateAction<{ number: string; date: number }>>
}
export interface tripProp {
    trips: props['trip']
    bill: { number: string; date: number }
}
export const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
}
export interface tripProps {
    id: number
    trip: trip
    toll: overallTrip['tollPlaza']
}
export interface dataProps {
    tollPlazaLocationId: number
    amount: number
    overallTripId: number
}
export interface property {
    billNo: string
    billDate: number
}
export interface data {
    amount: number
}
