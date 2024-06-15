import { Button, TableCell, TextField } from '@mui/material'
import React, { FC, useState } from 'react'
import { ApproveButton } from './approveButton'
interface TableFields {
    freightRate: { freight: number; id: number }
    setEditStatus: React.Dispatch<React.SetStateAction<boolean>>
    editStatus: boolean
}
const findButtonName = (editStatus: boolean) => (!editStatus ? 'Edit' : 'Cancel')
export const TableFields: FC<TableFields> = ({ freightRate, editStatus, setEditStatus }) => {
    const [freight, setFright] = useState(freightRate.freight)
    return (
        <>
            <NumberInput editStatus={editStatus} freight={freight} setFright={setFright} />
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
            <ApproveButton trip={{ freight, id: freightRate.id }} setEditStatus={setEditStatus} />
        </>
    )
}
interface NumberInputProps {
    editStatus: boolean
    freight: number
    setFright: React.Dispatch<React.SetStateAction<number>>
}
const NumberInput: FC<NumberInputProps> = ({ editStatus, freight, setFright }) => (
    <TableCell>
        {editStatus && (
            <TextField
                label="Edit FreightAmount"
                value={freight}
                onChange={(e) => setFright(parseInt(e.target.value))}
            />
        )}
    </TableCell>
)
