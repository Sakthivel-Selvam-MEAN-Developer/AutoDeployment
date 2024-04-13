import { Control, Controller } from 'react-hook-form'
import { FormControlLabel, Switch } from '@mui/material'

interface BooleanInputProps {
    control: Control
    label: string
    fieldName: string
}
const BooleanInput = ({ control, label, fieldName }: BooleanInputProps) => {
    return (
        <Controller
            render={({ field }) => (
                <FormControlLabel
                    label={label}
                    control={
                        <Switch
                            onChange={(e) => field.onChange(e.target.checked)}
                            checked={field.value}
                        />
                    }
                />
            )}
            name={fieldName}
            control={control}
        />
    )
}

export default BooleanInput
