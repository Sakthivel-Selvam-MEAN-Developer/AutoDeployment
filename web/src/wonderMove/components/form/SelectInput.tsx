import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from 'react-hook-form'

interface SelectInputProps {
    control: any;
    listValues: string[];
    label: string;
    fieldName: string;
}
const SelectInput: React.FC<SelectInputProps> = ({ control, listValues, label, fieldName }) => (
    <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id={`${fieldName}-label-id`}>{label}</InputLabel>
        <Controller
            render={({ field }) => (
                <Select
                    {...field}
                    labelId={`${fieldName}-label-id`}
                    defaultValue=""
                >
                    {listValues.map((listValue, index) => {
                        return (
                            <MenuItem key={index} value={listValue}>
                                {listValue}
                            </MenuItem>
                        )
                    })}
                </Select>
            )}
            name={fieldName}
            control={control}
        />
    </FormControl>
)

export default SelectInput
