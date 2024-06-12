import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { finalDataProps } from './show'
import { DialogContentComponent } from './dialogBoxUtils'
import { closeButtonStyles } from './dialogboxStyle'

interface DialogBoxProps {
    open: boolean
    onClose: () => void
    row: finalDataProps
    authoriser: boolean
}
const filterColumns = (keys: string[], authoriser: boolean): string[] => {
    if (authoriser) return keys
    return keys.filter((key) => !['freightAmount', 'totalFreightAmount', 'margin'].includes(key))
}
const splitKeys = (keys: string[]): [string[], string[]] => {
    const half = Math.ceil(keys.length / 2)
    return [keys.slice(0, half), keys.slice(half)]
}
export const DialogBox: React.FC<DialogBoxProps> = ({ open, onClose, row, authoriser }) => {
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
            <DialogContentComponent row={row} firstcol={firstcol} secCol={secCol} />
        </Dialog>
    )
}
