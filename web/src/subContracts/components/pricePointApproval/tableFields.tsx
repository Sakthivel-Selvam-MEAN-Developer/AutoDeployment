import React, { FC, useState } from 'react'
import { ApproveButton } from './approveButton'
import { PercentageInput } from './percentageInput'
import { FreightInput } from './freightInput'
import { EditButton } from './editButton'
interface TableFields {
    freightRate: { freight: number; id: number }
    setEditStatus: React.Dispatch<React.SetStateAction<boolean>>
    editStatus: boolean
    transporterPercentage: number
}
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
            <EditButton
                editStatus={editStatus}
                setFright={setFright}
                freightRate={freightRate}
                setEditStatus={setEditStatus}
            />
            <ApproveButton
                trip={{
                    approvedFreightAmount: freight,
                    id: freightRate.id,
                    transporterPercentage: transPercentage
                }}
                setEditStatus={setEditStatus}
            />
        </>
    )
}
