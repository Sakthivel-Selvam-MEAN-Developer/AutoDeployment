import { Control } from 'react-hook-form'

export interface formField {
    control: Control
}
export interface invocieList {
    control: Control
    invoiceList: { id: number; name: string }[]
}
