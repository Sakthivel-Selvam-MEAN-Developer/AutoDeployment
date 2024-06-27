import { DialogActions, Button, Autocomplete, TextField } from '@mui/material'
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
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>,
    previouslySelectedLocations: string[],
    setPreviouslySelectedLocations: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const filteredOptions = location.filter(
        (loc) => !previouslySelectedLocations.includes(loc.location)
    )
    return (
        <Autocomplete
            sx={{ width: '250px' }}
            value={selectedLocation}
            options={filteredOptions.map((loc) => loc.location)}
            onChange={(_event, newValue) => {
                setSelectedLocation(newValue || '')
                setPreviouslySelectedLocations((prev) => [...prev, newValue || ''])
            }}
            renderInput={(params) => <TextField {...params} label="Select TollPlaza Location" />}
        />
    )
}
