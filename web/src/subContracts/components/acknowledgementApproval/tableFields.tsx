import { FC, useEffect, useState } from 'react'
import { TableCell } from '@mui/material'
import { ApproveButton, EditButton } from './buttons'
import { ShortageProps, TableFieldsProps } from './tableFieldsType'
import { fieldData } from './approvalContext'
import { TextFieldConatiner } from './tableInput'
import { Container } from './dropDownContainer'
export const TableFields: FC<TableFieldsProps> = ({ overallTrip, setSendStatus }) => {
    useEffect(() => {
        setFieldValues({
            quantity: shortage.unloadedQuantity,
            approvalStatus: shortage.approvalStatus
        })
    }, [overallTrip])
    const shortage = overallTrip.shortageQuantity[0]
    const [fieldValues, setFieldValues] = useState({
        quantity: 0,
        approvalStatus: true
    })
    const [editStatus, setEditStatus] = useState(true)
    return (
        <fieldData.Provider value={{ fieldValues, setFieldValues }}>
            <ShortageConatiner
                editStatus={editStatus}
                shortage={shortage.unloadedQuantity}
                approvalStatus={shortage.approvalStatus}
            />
            <TableCell sx={{ textAlign: 'center' }}>
                <EditButton
                    setEditStatus={setEditStatus}
                    shortage={shortage.unloadedQuantity}
                    editStatus={editStatus}
                />
                <ApproveButton
                    overallTrip={overallTrip}
                    setSendStatus={setSendStatus}
                    setEditStatus={setEditStatus}
                />
            </TableCell>
        </fieldData.Provider>
    )
}
const ShortageConatiner: FC<ShortageProps> = ({ approvalStatus, editStatus, shortage }) => {
    return (
        <>
            <TableCell sx={{ textAlign: 'center' }}>
                {editStatus ? shortage : <TextFieldConatiner />}
            </TableCell>
            <Container editStatus={editStatus} approvalStatus={approvalStatus} />
        </>
    )
}
