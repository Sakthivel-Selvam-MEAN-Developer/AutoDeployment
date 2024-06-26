import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { finalDataProps } from './show'
import { DialogContentComponent, formatKey } from './dialogBoxUtils'
import { closeButtonStyles } from './dialogboxStyle'
import { getDriver } from '../../../services/driver'

interface DialogBoxProps {
    open: boolean
    onClose: () => void
    row: finalDataProps
    authoriser: boolean
    id: number | undefined
    setSelectedRow: (row: finalDataProps | null) => void
}
const filterColumns = (keys: string[], authoriser: boolean): string[] => {
    return keys.filter((key) => {
        if (!authoriser && ['freightAmount', 'totalFreightAmount', 'margin'].includes(key))
            return false
        return key !== 'number' && key !== 'id'
    })
}
const splitKeys = (keys: string[]): [string[], string[]] => {
    const half = Math.ceil(keys.length / 2)
    return [keys.slice(0, half), keys.slice(half)]
}
export const DialogBox: React.FC<DialogBoxProps> = ({
    open,
    onClose,
    row,
    authoriser,
    id,
    setSelectedRow
}) => {
    useEffect(() => {
        if (id) {
            getDriver(id)
                .then((data) => {
                    const updatedRow = {
                        ...row,
                        driverName:
                            data.driverAdvances.length > 0
                                ? data.driverAdvances[0].driver.name
                                : 'Not Applicable',
                        totalExpense:
                            data.driverAdvances.length > 0 ? data.amount : 'Not Applicable',
                        advanceAmount:
                            data.driverAdvances.length > 0 &&
                            data.driverAdvances[0].driverAdvanceForTrip.length > 0
                                ? data.driverAdvances[0].driverAdvanceForTrip[0].amount
                                : 'Not Applicable'
                    }
                    setSelectedRow(updatedRow)
                })
                .catch(() => alert('Error Getting data'))
        }
    }, [id])
    const keys = Object.keys(row)
    const [firstColumn, secondColumn] = splitKeys(keys)
    const firstcol = filterColumns(firstColumn, authoriser)
    const secCol = filterColumns(secondColumn, authoriser)
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                <b>Trip Details</b>
            </DialogTitle>
            <IconButton onClick={onClose} sx={closeButtonStyles}>
                <CloseIcon />
            </IconButton>
            <DialogContentComponent
                row={row}
                firstcol={firstcol}
                secCol={secCol}
                formatKey={formatKey}
            />
        </Dialog>
    )
}
