import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

interface SearchStopsProps {
    onSelect: React.Dispatch<React.SetStateAction<string | undefined>>
}

const SearchStops: React.FC<SearchStopsProps> = ({ onSelect }) => {
    const [value, setValue] = useState<string>()
    return (
        <>
            <Autocomplete
                freeSolo
                disableClearable
                value={value}
                options={[]}
                onChange={(_event, newValue: string) => {
                    setValue(newValue)
                    if (newValue) onSelect(newValue)
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search stops by number to act on it"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search'
                        }}
                    />
                )}
            />
        </>
    )
}
export default SearchStops
