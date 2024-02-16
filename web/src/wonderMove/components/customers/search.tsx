import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

interface SearchCustomerProps {
    customers: any[]
    onSelect: (selectedVehicle: any) => void
}
const SearchCustomer: React.FC<SearchCustomerProps> = ({ customers, onSelect }) => {
    const [value, setValue] = useState<string>()
    return (
        <Autocomplete
            freeSolo
            disableClearable
            value={value}
            options={customers.map((data) => data.name)}
            onChange={(_event, newValue: string) => {
                setValue(newValue)
                if (newValue) {
                    onSelect(newValue)
                }
            }}
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
