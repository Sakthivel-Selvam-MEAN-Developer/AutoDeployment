import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material'
import { InputFields } from './displayAllTable'
import { AutoButton, TollButton } from './show'
import { BoxModelType } from './tableBody'
export function displayDataGrid(
    open: boolean,
    handleClose: () => void,
    selectedLocation: string,
    location: { location: string; id: number }[],
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>,
    tollFare: string,
    setTollFare: React.Dispatch<React.SetStateAction<string>>,
    tollEntries: {
        location: string
        amount: number
        overallTripId: number
        tollPlazaLocationId: number
    }[],
    handleAddTollEntry: () => void,
    handleSubmit: () => Promise<void>
) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>TollPlaza Details</DialogTitle>
            <DialogContent>
                {AutoButton(selectedLocation, location, setSelectedLocation)}
                {InputFields(tollFare, setTollFare)}
                <Box mt={2}>{BoxModelType(tollEntries)}</Box>
            </DialogContent>
            {TollButton(handleAddTollEntry, handleClose, handleSubmit)}
        </Dialog>
    )
}
export function submitEnable(
    handleAddTollEntry: () => void,
    setIsSubmitEnabled: React.Dispatch<React.SetStateAction<boolean>>
) {
    return () => {
        handleAddTollEntry()
        setIsSubmitEnabled(true)
    }
}
