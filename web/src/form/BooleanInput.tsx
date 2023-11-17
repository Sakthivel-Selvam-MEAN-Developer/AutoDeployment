import { Controller } from 'react-hook-form'
import { FormControlLabel, Switch } from '@mui/material'

interface BooleanInputProps {
    control: any
    label: string
    fieldName: string
}
function BooleanInput({ control, label, fieldName }: BooleanInputProps) {
    return (
        <Controller
            render={({ field }: any) => (
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
