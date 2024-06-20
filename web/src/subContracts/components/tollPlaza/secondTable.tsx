import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material'
import { InputFields } from './displayAllTable'
import { AutoButton, TollButton } from './show'
import { SetStateAction } from 'react'
import { BoxModelType } from './tableBody'
export function displayDataGrid(
    open: boolean,
    handleClose: () => void,
    selectedLocation: string,
    location: { location: string; id: number }[],
    setSelectedLocation: {
        (value: SetStateAction<string>): void
        (value: SetStateAction<string>): void
    },
    tollFare: string,
    setTollFare: { (value: SetStateAction<string>): void; (value: SetStateAction<string>): void },
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
