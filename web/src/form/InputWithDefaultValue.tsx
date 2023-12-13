import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: Control
    label: string
    fieldName: string
    type: 'number' | 'string'
    value: any
    InputProps: object
    defaultValue: any
    InputLabelProps: any
}
function InputWithDefaultValue({
    control,
    label,
    fieldName,
    type,
    value,
    InputProps,
    defaultValue,
    InputLabelProps
}: TextInputProps) {
    return (
        <Controller
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    InputProps={InputProps}
                    value={value}
                    InputLabelProps={InputLabelProps}
                />
            )}
            name={fieldName}
            control={control}
            defaultValue={defaultValue}
        />
    )
}

export default InputWithDefaultValue
