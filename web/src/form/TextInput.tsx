import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

interface TextInputProps {
    control: any
    label: string
    fieldName: string
}
function TextInput({ control, label, fieldName }: TextInputProps) {
    return (
        <Controller
            render={({ field }) => <TextField {...field} label={label} />}
            name={fieldName}
            control={control}
        />
    )
}

export default TextInput
