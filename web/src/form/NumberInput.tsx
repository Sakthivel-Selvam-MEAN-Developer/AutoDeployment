import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: any
    label: string
    fieldName: string
    type: string
    InputProps: any
}
function NumberInput({ control, label, fieldName, type, InputProps }: TextInputProps) {
    return (
        <Controller
            render={({ field }) => (
                <TextField {...field} label={label} type={type} InputProps={InputProps} />
            )}
            name={fieldName}
            control={control}
        />
    )
}

export default NumberInput
