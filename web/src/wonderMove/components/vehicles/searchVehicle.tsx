import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'

interface SearchVehicleProps {
    vehicles: any[]
    onSelect: (selectedVehicle: string) => void
}
const SearchVehicle: React.FC<SearchVehicleProps> = ({ vehicles, onSelect }) => {
    const [value, setValue] = useState<string>('')

    const onChange = (_event: React.SyntheticEvent<Element, Event>, newValue: string) => {
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
            options={vehicles.map((e) => e.number)}
            onChange={onChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search vehicle by number to act on it"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search'
                    }}
                />
            )}
        />
    )
}

export default SearchVehicle
