import { overallTripProps } from '../../types/tripTypes'

export interface TableFieldsProps {
    overallTrip: overallTripProps
}
export interface ShortageProps {
    editStatus: boolean
    shortage: number
    quantity: number
    setQuantity: React.Dispatch<React.SetStateAction<number>>
}
export interface TextFieldConatinerProps {
    quantity: number
    setQuantity: React.Dispatch<React.SetStateAction<number>>
}
