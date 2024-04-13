import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: Control
    label: string
    fieldName: string
    InputProps: object
    disabled: boolean
}
const TextInputWithPattern = ({
    control,
    label,
    fieldName,
    InputProps,
    disabled
}: TextInputProps) => {
    return (
        <Controller
            render={({ field }) => <TextField {...field} label={label} InputProps={InputProps} />}
            name={fieldName}
            control={control}
            disabled={disabled}
        />
    )
}

export default TextInputWithPattern
