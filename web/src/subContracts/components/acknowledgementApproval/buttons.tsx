import { Button } from '@mui/material'
import { FC, useContext } from 'react'
import { approveAcknowledgement } from '../../services/acknowlegementApproval'
import { fieldData, tripContext } from './approvalContext'
import { ApproveButtonProps, BProps } from './buttontype'
export const EditButton: FC<BProps> = ({ setEditStatus, shortage, editStatus }) => {
    const { setFieldValues } = useContext(fieldData)
    const onClick = () => {
        setFieldValues((prev) => {
            return { ...prev, quantity: shortage }
        })
        setEditStatus((prev) => !prev)
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
export const ApproveButton: FC<ApproveButtonProps> = ({ overallTrip, setEditStatus }) => {
    const { setTripDetails } = useContext(tripContext)
    const { fieldValues, setFieldValues } = useContext(fieldData)
    const onClick = () =>
        approveAcknowledgement(
            overallTrip.id,
            fieldValues.quantity,
            fieldValues.approvalStatus
        ).then(() => {
            setTripDetails((prev) => prev.filter(({ id }) => overallTrip.id !== id))
            setEditStatus(true)
            setFieldValues((prev) => {
                return { ...prev, quantity: 0, approvalStatus: true }
            })
        })
    return <ButtonConatiner onClick={onClick} />
}
interface buttonProps {
    onClick: () => void
}
const ButtonConatiner: FC<buttonProps> = ({ onClick }) => (
    <Button sx={{ marginBottom: '15px' }} variant="contained" onClick={onClick}>
        Approved
    </Button>
)
