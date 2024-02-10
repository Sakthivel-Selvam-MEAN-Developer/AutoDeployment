import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { ChangeEvent } from 'react'

interface TextInputProps {
    control: Control
    label: string
    fieldName: string
    InputProps: any
    type: 'number'
    value: number
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
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
