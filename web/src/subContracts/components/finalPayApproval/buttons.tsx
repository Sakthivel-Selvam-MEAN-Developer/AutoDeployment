import { Button } from '@mui/material'
import { FC, useContext } from 'react'
import { overallTripProps } from '../../types/tripTypes'
import { approveAcknowledgement } from '../../services/acknowlegementApproval'
import { tripContext } from './approvalContext'

interface BProps {
    setEditStatus: React.Dispatch<React.SetStateAction<boolean>>
    setQuantity: React.Dispatch<React.SetStateAction<number>>
    shortage: number
    editStatus: boolean
}
export const EditButton: FC<BProps> = ({ setEditStatus, setQuantity, shortage, editStatus }) => {
    const onClick = () => {
        setEditStatus((prev) => !prev)
        setQuantity(shortage)
    }
    return (
        <Button
            sx={{ marginRight: '15px', marginBottom: '15px' }}
            onClick={onClick}
            variant="contained"
        >
            {editStatus ? 'Edit' : 'Cancel'}
        </Button>
    )
}
interface ApproveButtonProps {
    overallTrip: overallTripProps
    quantity: number
    setQuantity: React.Dispatch<React.SetStateAction<number>>
}
export const ApproveButton: FC<ApproveButtonProps> = ({ overallTrip, quantity, setQuantity }) => {
    const { setTripDetails } = useContext(tripContext)
    const onClick = () =>
        approveAcknowledgement(overallTrip.id, quantity).then(() => {
            setTripDetails((prev) => {
                const trips = prev.filter(({ id }) => overallTrip.id !== id)
                return trips
            })
            setQuantity(0)
        })
    return (
        <Button sx={{ marginBottom: '15px' }} variant="contained" onClick={onClick}>
            Approved
        </Button>
    )
}
