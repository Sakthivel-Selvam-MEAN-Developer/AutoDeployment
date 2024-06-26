import React, { useState } from 'react'
import { DialogActions, Button, Autocomplete, TextField } from '@mui/material'
import { submitEnable } from './secondTable'
type TollButtonProps = (
    handleAddTollEntry: () => void,
    handleClose: () => void,
    handleSubmit: () => Promise<void>
) => JSX.Element
export const TollButton: TollButtonProps = (handleAddTollEntry, handleClose, handleSubmit) => {
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
    const handleAddClick = submitEnable(handleAddTollEntry, setIsSubmitEnabled)
    return (
        <DialogActions>
            <Button onClick={handleAddClick} color="primary">
                Add
            </Button>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
            <Button onClick={handleSubmit} color="primary" disabled={!isSubmitEnabled}>
                Submit
            </Button>
        </DialogActions>
    )
}
export const CloseButton = (handleClose: () => void) => {
    return (
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
        </DialogActions>
    )
}
export const AutoButton = (
    selectedLocation: string,
    location: { location: string; id: number }[],
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>
) => {
    return (
        <Autocomplete
            sx={{ width: '250px' }}
            value={selectedLocation}
            options={location.map((loc) => loc.location)}
            onChange={(_event, newValue) => setSelectedLocation(newValue || '')}
            renderInput={(params) => <TextField {...params} label="Select TollPlaza Location" />}
        />
    )
}
