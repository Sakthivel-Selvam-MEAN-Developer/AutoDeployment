import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: Control
    label: string
    fieldName: string
    type: 'number' | 'string' | 'email'
    disabled: any
}
function InputWithType({ control, label, fieldName, type, disabled }: TextInputProps) {
    return (
        <Controller
            render={({ field }) => <TextField {...field} label={label} type={type} />}
            name={fieldName}
            control={control}
            disabled={disabled}
        />
    )
}

export default InputWithType
