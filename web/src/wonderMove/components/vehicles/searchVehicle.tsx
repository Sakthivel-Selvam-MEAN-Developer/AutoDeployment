import { Autocomplete, TextField } from '@mui/material'
import { useState, ChangeEvent } from 'react'

interface SearchVehicleProps {
    vehicles: any[];
    onSelect: (selectedVehicle: any) => void;
}
const SearchVehicle: React.FC<SearchVehicleProps> = ({ vehicles, onSelect }) => {
    const [value, setValue] = useState<any | null>(null)

    const onChange = (_event: ChangeEvent<{}>, newValue: any | null) => {
        setValue(newValue)
        if (newValue) {
            onSelect(newValue)
        }
    }

    return (
        <Autocomplete
            freeSolo
            disableClearable
            value={value}
            options={vehicles}
            onChange={onChange}
            renderInput={(params) => 
                <TextField
                    {...params}
                    label="Search vehicle by number to act on it"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }}
                />
            }
        />
    )
}

export default SearchVehicle
