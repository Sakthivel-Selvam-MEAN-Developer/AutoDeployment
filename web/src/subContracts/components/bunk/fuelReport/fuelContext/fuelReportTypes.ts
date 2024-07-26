import { Dispatch } from 'react'
import { Control } from 'react-hook-form'
export interface TransporterFieldProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
export type dispatchType =
    | { type: string; bunkId: number }
    | { type: string; vehicleNumber: string | null }
    | { type: string; paymentStatus: string }
    | { type: string; from: number; to: number }
    | { type: string; pageNumber: number }
    | { type: string; transporterType: number }
export interface FuelFilterFormProps {
    setfuelReportData: React.Dispatch<React.SetStateAction<never[]>>
    setCount: React.Dispatch<React.SetStateAction<number>>
}
export interface fuelReoprtActionProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
