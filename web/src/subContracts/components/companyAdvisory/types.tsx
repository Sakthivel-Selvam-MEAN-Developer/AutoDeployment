import { Control } from 'react-hook-form'

export interface formField {
    control: Control
}
export interface invoiceList {
    control: Control
    invoiceList: list[]
    companyList: list[]
}
export interface company {
    control: Control
    companyList: list[]
    setCpnyName: React.Dispatch<React.SetStateAction<string>>
}
interface list {
    id: number
    name: string
}
