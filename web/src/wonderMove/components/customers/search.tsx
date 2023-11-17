import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

interface SearchCustomerProps {
    customers: any[]
    onSelect: (selectedVehicle: any) => void
}
const SearchCustomer: React.FC<SearchCustomerProps> = ({ customers, onSelect }) => {
    const [value, setValue] = useState()
    const onChange = (_event: any, newValue: any | null) => {
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
            options={customers.map((data) => data.name)}
            onChange={onChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search customer by name to act on it"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search'
                    }}
                />
            )}
        />
    )
}
export default SearchCustomer
