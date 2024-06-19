import { Button } from '@mui/material'
import React, { FC, useState } from 'react'
import { ApproveButton } from './approveButton'
import { PercentageInput } from './percentageInput'
import { FreightInput } from './freightInput'
interface TableFields {
    freightRate: { freight: number; id: number }
    setEditStatus: React.Dispatch<React.SetStateAction<boolean>>
    editStatus: boolean
    transporterPercentage: number
}
const findButtonName = (editStatus: boolean) => (!editStatus ? 'Edit' : 'Cancel')
export const TableFields: FC<TableFields> = ({
    freightRate,
    editStatus,
    setEditStatus,
    transporterPercentage
}) => {
    const [freight, setFright] = useState(freightRate.freight)
    const [transPercentage, setTansPercentage] = useState(transporterPercentage)
    return (
        <>
            <FreightInput editStatus={editStatus} freight={freight} setFright={setFright} />
            <PercentageInput
                editStatus={editStatus}
                percentage={transPercentage}
                setPercentage={setTansPercentage}
                freight={freight}
            />
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
            <ApproveButton
                trip={{ freight, id: freightRate.id, transporterPercentage: transPercentage }}
                setEditStatus={setEditStatus}
            />
        </>
    )
}
