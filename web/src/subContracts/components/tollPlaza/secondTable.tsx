import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material'
import { InputFields } from './displayAllTable'
import { AutoButton } from './show'
import { BoxModelType } from './tableBody'
import { TollButton } from './autoButton'
export const DisplayDataGrid = (
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
    handleSubmit: () => Promise<void>,
    setPreviouslySelectedLocations: React.Dispatch<React.SetStateAction<string[]>>,
    previouslySelectedLocations: string[]
) => {
    const handleAddTollEntryWithUpdate = () => {
        if (selectedLocation) {
            setPreviouslySelectedLocations([...previouslySelectedLocations, selectedLocation])
            handleAddTollEntry()
            setSelectedLocation('')
        }
    }
    const handleSubmitWithUpdate = async () => {
        await handleSubmit()
        setPreviouslySelectedLocations([])
    }
    return (
        <Dialog open={open}>
            <DialogTitle>TollPlaza Details</DialogTitle>
            <DialogContent>
                {AutoButton(
                    selectedLocation,
                    location,
                    setSelectedLocation,
                    previouslySelectedLocations,
                    setPreviouslySelectedLocations
                )}
                {InputFields(tollFare, setTollFare)}
                <Box mt={2}>{BoxModelType(tollEntries)}</Box>
            </DialogContent>
            {TollButton(handleAddTollEntryWithUpdate, handleClose, handleSubmitWithUpdate)}
        </Dialog>
    )
}
