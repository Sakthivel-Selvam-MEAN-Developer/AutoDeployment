import { Dispatch } from 'react'
import { Control } from 'react-hook-form'
export interface TransporterFieldProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
export type dispatchType =
    | { type: string; bunkId: number }
    | { type: string; vehicleNumberId: number }
    | { type: string; transactionId: number }
    | { type: string; from: number; to: number }
    | { type: string; pageNumber: number }
export interface TripFilterFormProps {
    setfuelReportData: React.Dispatch<React.SetStateAction<never[]>>
    setCount: React.Dispatch<React.SetStateAction<number>>
}
export interface FuelReoprtActionProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
