import { DialogActions, Button, Autocomplete, TextField } from '@mui/material'
export const TollButton = (
    handleAddTollEntry: () => void,
    handleClose: () => void,
    handleSubmit: () => Promise<void>
) => {
    return (
        <DialogActions>
            <Button onClick={handleAddTollEntry} color="primary">
                Add
            </Button>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
            {/* {showSubmit &&( */}
            <Button onClick={handleSubmit} color="primary">
                Submit
            </Button>
            {/* )} */}
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
