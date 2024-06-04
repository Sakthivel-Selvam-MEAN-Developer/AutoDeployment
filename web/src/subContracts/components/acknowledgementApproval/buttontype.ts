import { overallTripProps } from '../../types/tripTypes'

export interface ApproveButtonProps {
    overallTrip: overallTripProps
    setEditStatus: React.Dispatch<React.SetStateAction<boolean>>
    setSendStatus: React.Dispatch<React.SetStateAction<boolean>>
}
export interface BProps {
    setEditStatus: React.Dispatch<React.SetStateAction<boolean>>
    shortage: number
    editStatus: boolean
}
export interface ContainerProps {
    editStatus: boolean
    approvalStatus: boolean
}
