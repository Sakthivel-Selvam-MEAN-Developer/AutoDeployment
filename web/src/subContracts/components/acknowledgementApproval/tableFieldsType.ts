import { overallTripProps } from '../../types/tripTypes'

export interface TableFieldsProps {
    overallTrip: overallTripProps
    setSendStatus: React.Dispatch<React.SetStateAction<boolean>>
}
export interface ShortageProps {
    editStatus: boolean
    approvalStatus: boolean
    shortage: number
}
export interface TextFieldConatinerProps {
    quantity: number
    setQuantity: React.Dispatch<React.SetStateAction<number>>
}
