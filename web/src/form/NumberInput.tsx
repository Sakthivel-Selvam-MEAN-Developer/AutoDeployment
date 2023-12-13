import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: Control
    label: string
    fieldName: string
    InputProps: object
    type: 'number'
}
function NumberInput({ control, label, fieldName, InputProps, type }: TextInputProps) {
    return (
        <Controller
            render={({ field }) => (
                <TextField {...field} label={label} InputProps={InputProps} type={type} />
            )}
            name={fieldName}
            control={control}
        />
    )
}

export default NumberInput
