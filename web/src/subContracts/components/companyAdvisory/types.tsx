import { Control } from 'react-hook-form'

export interface formField {
    control: Control
}
export interface invoiceList {
    control: Control
    invoiceList: list[]
    advisoryList: list[]
}
export interface advisory {
    control: Control
    advisoryList: list[]
    setAdvId: React.Dispatch<React.SetStateAction<string>>
}
interface list {
    id: number
    name: string
}
