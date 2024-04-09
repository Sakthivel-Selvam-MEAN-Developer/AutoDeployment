import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

interface SelectInputProps {
    control: Control
    listValues: string[]
    label: string
    fieldName: string
}
const menuItem = (index: number, listValue: string) => {
    return (
        <MenuItem key={index} value={listValue}>
            {listValue}
        </MenuItem>
    )
}
const SelectInput: React.FC<SelectInputProps> = ({ control, listValues, label, fieldName }) => (
    <FormControl sx={{ minWidth: 195 }}>
        <InputLabel id={`${fieldName}-label-id`}>{label}</InputLabel>
        <Controller
            render={({ field }) => (
                <Select {...field} labelId={`${fieldName}-label-id`} defaultValue="">
                    {listValues.map((listValue, index) => {
                        return menuItem(index, listValue)
                    })}
                </Select>
            )}
            name={fieldName}
            control={control}
        />
    </FormControl>
)

export default SelectInput
