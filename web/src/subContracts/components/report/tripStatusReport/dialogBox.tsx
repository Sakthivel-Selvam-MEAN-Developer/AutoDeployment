import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { finalDataProps } from './show'
import { Column } from './dialogBoxUtils'
import { closeButtonStyles, columnsContainerStyles } from './dialogboxStyle'

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
    const filteredFirstColumn = filterColumns(firstColumn, authoriser)
    const filteredSecondColumn = filterColumns(secondColumn, authoriser)
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                <b>Trip Details</b>
            </DialogTitle>
            <IconButton onClick={onClose} sx={closeButtonStyles}>
                <CloseIcon />
            </IconButton>
            <DialogContent dividers style={columnsContainerStyles}>
                {[
                    <Column key="firstColumn" keys={filteredFirstColumn} row={row} />,
                    <Column key="secondColumn" keys={filteredSecondColumn} row={row} />
                ]}
            </DialogContent>
        </Dialog>
    )
}
export default DialogBox
