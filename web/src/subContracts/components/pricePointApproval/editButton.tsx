import { Button } from '@mui/material'
import { FC } from 'react'
interface EditButtonProps {
    setFright: React.Dispatch<React.SetStateAction<number>>
    setEditStatus: React.Dispatch<React.SetStateAction<boolean>>
    freightRate: { freight: number; id: number }
    editStatus: boolean
}
const findButtonName = (editStatus: boolean) => (!editStatus ? 'Edit' : 'Cancel')

export const EditButton: FC<EditButtonProps> = ({
    setFright,
    freightRate,
    editStatus,
    setEditStatus
}) => (
    <Button
        sx={{ marginBottom: '15px' }}
        variant="contained"
        onClick={() => {
            if (editStatus === false) setFright(freightRate.freight)
            setEditStatus((prev) => !prev)
        }}
    >
        {findButtonName(editStatus)}
    </Button>
)
