import { Autocomplete, TextField } from '@mui/material'
import {ChangeEvent, useState} from 'react'

interface SearchStopsProps {
    onSelect: (selectedStop: any) => void;
}

const SearchStops: React.FC<SearchStopsProps> = ({ onSelect }) => {
    const [value, setValue] = useState()

    const onChange = (_event: ChangeEvent<{}>, newValue: any | null) => {
        setValue(newValue)
        if (newValue) {
            onSelect(newValue)
        }
    }

    return (
        <>
            <Autocomplete
                freeSolo
                disableClearable
                value={value}
                options={[]}
                onChange={onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search stops by number to act on it"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
        </>
    )
}

export default SearchStops
