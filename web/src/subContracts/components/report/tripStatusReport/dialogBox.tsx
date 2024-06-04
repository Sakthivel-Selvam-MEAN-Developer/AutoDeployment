import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { finalDataProps } from './show'
import { Column } from './dialogBoxUtils'

interface DialogBoxProps {
    open: boolean
    onClose: () => void
    row: finalDataProps
}
const closeButtonStyles = {
    position: 'absolute',
    right: 8,
    top: 8
}
const columnsContainerStyles = {
    display: 'flex',
    justifyContent: 'space-around'
}
export const DialogBox: React.FC<DialogBoxProps> = ({ open, onClose, row }) => {
    const keys = Object.keys(row)
    const half = Math.ceil(keys.length / 2)
    const firstColumn = keys.slice(0, half)
    const secondColumn = keys.slice(half)
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                {' '}
                <b>Trip Details</b>
            </DialogTitle>
            <IconButton onClick={onClose} sx={closeButtonStyles}>
                <CloseIcon />
            </IconButton>
            <DialogContent dividers style={columnsContainerStyles}>
                {[
                    <Column key="firstColumn" keys={firstColumn} row={row} />,
                    <Column key="secondColumn" keys={secondColumn} row={row} />
                ]}
            </DialogContent>
        </Dialog>
    )
}
export default DialogBox
