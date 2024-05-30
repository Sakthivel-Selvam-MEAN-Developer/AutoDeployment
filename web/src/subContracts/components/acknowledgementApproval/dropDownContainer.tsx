import { FC } from 'react'
import { ContainerProps } from './buttontype'
import { TableCell } from '@mui/material'
import { DropDown } from './tableInput'

export const Container: FC<ContainerProps> = ({ editStatus, approvalStatus }) => {
    const status = (approvalStatus: boolean) =>
        approvalStatus === true ? 'Acceptable' : 'Rejectable'
    return (
        <TableCell sx={{ textAlign: 'center' }}>
            {editStatus ? <p>{`${status(approvalStatus)}`}</p> : <DropDown />}
        </TableCell>
    )
}
