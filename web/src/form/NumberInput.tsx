import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: any
    label: string
    fieldName: string
    type: string
}
function NumberInput({ control, label, fieldName, type }: TextInputProps) {
    return (
        <Controller
            render={({ field }) => <TextField {...field} label={label} type={type} />}
            name={fieldName}
            control={control}
        />
    )
}

export default NumberInput
