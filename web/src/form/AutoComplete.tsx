import { Autocomplete, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

interface AutocompleteProps {
    options: string[]
    control: Control<any>
    fieldName: string
    label: string
    onChange: any
}
const AutoComplete: React.FC<AutocompleteProps> = ({
    options,
    control,
    fieldName,
    label,
    onChange
}) => {
    return (
        <Controller
            name={fieldName}
            control={control}
            defaultValue={null}
            render={({ field: { onChange: onFieldChange, ...field } }) => (
                <Autocomplete
                    sx={{ width: 300 }}
                    {...field}
                    options={options}
                    onChange={(event, value) => {
                        onFieldChange(value)
                        onChange(event, value)
                    }}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
            )}
        />
    )
}

export default AutoComplete
