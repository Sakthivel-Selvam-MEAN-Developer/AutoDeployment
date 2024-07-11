import React from 'react'
import { finalDataProps } from './show'
import DialogContent from '@mui/material/DialogContent'
import { columnsContainerStyles } from './dialogboxStyle'
import { renderColumn } from './columnHelpers.tsx'

interface ColumnProps {
    keys: string[]
    row: finalDataProps
    formatKey: (key: string) => string
}
interface DialogContentComponentProps {
    row: finalDataProps
    firstcol: string[]
    secCol: string[]
    formatKey: (key: string) => string
}
export const Column: React.FC<ColumnProps> = ({ keys, row, formatKey }) => {
    return (
        <div style={{ display: 'inline-block', marginRight: '20px' }}>
            {keys.map((key) => renderColumn(key, row, formatKey))}
        </div>
    )
}
export const DialogContentComponent: React.FC<DialogContentComponentProps> = ({
    row,
    firstcol,
    secCol,
    formatKey
}) => {
    return (
        <DialogContent dividers style={columnsContainerStyles}>
            {[
                <Column key="firstColumn" keys={firstcol} row={row} formatKey={formatKey} />,
                <Column key="secondColumn" keys={secCol} row={row} formatKey={formatKey} />
            ]}
        </DialogContent>
    )
}
