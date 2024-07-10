import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: Control<any>
    label: string
    fieldName: string
    type: 'number' | 'string' | 'email'
    disabled: boolean
}
const InputWithType = ({ control, label, fieldName, type, disabled }: TextInputProps) => {
    return (
        <Controller
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    InputLabelProps={{ shrink: true }}
                />
            )}
            name={fieldName}
            control={control}
            disabled={disabled}
        />
    )
}

export default InputWithType
