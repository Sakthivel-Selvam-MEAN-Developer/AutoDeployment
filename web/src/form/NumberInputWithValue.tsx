import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: Control
    label: string
    fieldName: string
    InputProps: any
    type: 'number'
    value: number
    onChange: any
}
function NumberInputWithValue({
    control,
    label,
    fieldName,
    InputProps,
    type,
    value,
    onChange
}: TextInputProps) {
    return (
        <Controller
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    InputProps={InputProps}
                    type={type}
                    onChange={onChange}
                    value={value}
                />
            )}
            name={fieldName}
            control={control}
        />
    )
}

export default NumberInputWithValue
