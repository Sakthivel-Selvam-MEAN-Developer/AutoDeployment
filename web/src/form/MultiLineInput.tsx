import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: Control
    label: string
    fieldName: string
    type: string
    rows: number
}
function MultiLineInput({ control, label, fieldName, type, rows }: TextInputProps) {
    return (
        <Controller
            render={({ field }) => (
                <TextField {...field} label={label} type={type} multiline rows={rows} />
            )}
            name={fieldName}
            control={control}
        />
    )
}

export default MultiLineInput
