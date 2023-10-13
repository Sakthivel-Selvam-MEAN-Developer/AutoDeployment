import { Autocomplete, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'

const SearchStops = ({ onSelect }) => {
    const [value, setValue] = useState()

    const onChange = (event, newValue) => {
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

SearchStops.propTypes = {
    onSelect: PropTypes.func,
}

export default SearchStops
