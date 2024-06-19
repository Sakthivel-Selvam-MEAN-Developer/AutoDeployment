import { FC, useContext } from 'react'
import { updateFreightinTrip } from '../../services/pricePointApproval'
import { submitStatusContext } from './approvalContext'
import { Button } from '@mui/material'

interface buttonPros {
    trip: { freight: number; id: number; transporterPercentage: number }
    setEditStatus: React.Dispatch<React.SetStateAction<boolean>>
}
export const ApproveButton: FC<buttonPros> = ({ trip, setEditStatus }) => {
    const { setSubmitStatus } = useContext(submitStatusContext)
    const onClick = () =>
        updateFreightinTrip(trip).then(() => {
            setEditStatus(false)
            setSubmitStatus((prev) => !prev)
        })
    return (
        <Button sx={{ marginBottom: '15px' }} variant="contained" onClick={onClick}>
            Approved
        </Button>
    )
}
