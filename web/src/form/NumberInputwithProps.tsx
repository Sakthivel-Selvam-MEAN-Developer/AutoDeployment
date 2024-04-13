import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: Control
    label: string
    fieldName: string
    inputProps: object
    type: 'number' | 'string'
    InputProps: object
}
const NumberInputWithProps = ({
    control,
    label,
    fieldName,
    inputProps,
    type,
    InputProps
}: TextInputProps) => {
    return (
        <Controller
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    inputProps={inputProps}
                    type={type}
                    InputProps={InputProps}
                />
            )}
            name={fieldName}
            control={control}
        />
    )
}

export default NumberInputWithProps
