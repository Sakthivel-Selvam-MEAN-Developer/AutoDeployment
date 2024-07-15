import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'
export interface accType {
    id: number
    accountTypeNumber: number
    accountTypeName: string
}
export interface bunkFields {
    control: Control
    accTypes: accType[]
    setAccType: React.Dispatch<React.SetStateAction<{ type: number; id: number }>>
}
export interface bunkField {
    control: Control
}
export interface accTypeFields {
    control: Control
    setAccType: React.Dispatch<React.SetStateAction<{ type: number; id: number }>>
}
export interface accTypeField {
    control: Control
    setAccType: React.Dispatch<React.SetStateAction<{ type: number; id: number }>>
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
    openDialog: boolean
    setValue: UseFormSetValue<FieldValues>
}
export type type = (setValue: UseFormSetValue<FieldValues>) => void
export interface bunkDetailsProps {
    id?: number
    bunkName: string
    accountHolder: string
    accountNumber: number
    accountTypeNumber: number
    accountTypeName?: string
    ifsc: string
    location: string
    branchName: string
    bunkType: string
    contactPersonName: string
    contactPersonNumber: number
    creaditDays: number
    emailId: string
}
export const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}
