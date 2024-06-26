import { Nullable } from '../../types'
export interface fuelFilters {
    bunkId?: Nullable<number>
    vehicleNumber?: Nullable<string>
    paymentStatus?: Nullable<boolean>
    from?: Nullable<number>
    to?: Nullable<number>
    pageNumber?: number
}
import { Dispatch } from 'react'
import { Control } from 'react-hook-form'
export interface TransporterFieldProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
export type dispatchType =
    | { type: string; bunkId: number }
    | { type: string; vehicleNumber: string }
    | { type: string; paymentStatus: boolean }
    | { type: string; from: number; to: number }
    | { type: string; pageNumber: number }
export interface TripFilterFormProps {
    setfuelReportData: React.Dispatch<React.SetStateAction<never[]>>
    setCount: React.Dispatch<React.SetStateAction<number>>
}
