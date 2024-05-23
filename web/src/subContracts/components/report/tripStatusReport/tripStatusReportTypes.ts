import { Dispatch } from 'react'
import { Control } from 'react-hook-form'
export interface TransporterFieldProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
export type dispatchType =
    | { type: string; cementCompanyId: number }
    | { type: string; transporterId: number }
    | { type: string; loadinPointId: number }
    | { type: string; vehicleNumber: string }
    | { type: string; invoiceNumber: string }
    | { type: string; from: number; to: number }
    | { type: string; pageNumber: number }
export interface TripFilterFormProps {
    setOverallTrips: React.Dispatch<React.SetStateAction<never[]>>
    setCount: React.Dispatch<React.SetStateAction<number>>
}
export interface FactoryFieldProps {
    control: Control
    cementCompanyName: string
    dispatch: Dispatch<dispatchType>
}
export type ActionType = {
    type: string
    cementCompanyId: number
    transporterId: number
    loadinPointId: number
    vehicleNumber: string
    invoiceNumber: string
    from: number
    to: number
    pageNumber: number
}
