import React from 'react'
import { finalDataProps } from './show'
import DialogContent from '@mui/material/DialogContent'
import { columnsContainerStyles } from './dialogboxStyle'

interface ColumnProps {
    keys: string[]
    row: finalDataProps
}
interface DialogContentComponentProps {
    row: finalDataProps
    firstcol: string[]
    secCol: string[]
}
export const Column: React.FC<ColumnProps> = ({ keys, row }) => {
    return (
        <div style={{ display: 'inline-block', marginRight: '20px' }}>
            {keys.map((key) => (
                <div key={key} style={{ marginBottom: '10px' }}>
                    <strong>{key}:</strong> {row[key as keyof finalDataProps]}
                </div>
            ))}
        </div>
    )
}
export const DialogContentComponent: React.FC<DialogContentComponentProps> = ({
    row,
    firstcol,
    secCol
}) => {
    return (
        <DialogContent dividers style={columnsContainerStyles}>
            {[
                <Column key="firstColumn" keys={firstcol} row={row} />,
                <Column key="secondColumn" keys={secCol} row={row} />
            ]}
        </DialogContent>
    )
}
