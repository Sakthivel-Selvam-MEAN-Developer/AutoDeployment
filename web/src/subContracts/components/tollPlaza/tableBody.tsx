import { createTollPlazaLocation } from '../../services/tollPlaza'
import { List, ListItem, ListItemText } from '@mui/material'

function Submitbutton(
    tollEntries: {
        location: string
        amount: number
        overallTripId: number
        tollPlazaLocationId: number
    }[],
    setReload: React.Dispatch<React.SetStateAction<boolean>>,
    reload: boolean,
    handleClose: () => void
) {
    return async () => {
        const entriesToSubmit = tollEntries.map((tollEntity) => {
            return {
                amount: tollEntity.amount,
                overallTripId: tollEntity.overallTripId,
                tollPlazaLocationId: tollEntity.tollPlazaLocationId
            }
        })
        await createTollPlazaLocation(entriesToSubmit).then(() => setReload(!reload))
        handleClose()
    }
}

export const BoxModelType = (
    tollEntries: {
        location: string
        amount: number
        overallTripId: number
        tollPlazaLocationId: number
    }[]
) => {
    return (
        <List>
            {tollEntries.map((entry, index) => (
                <ListItem key={index}>
                    <ListItemText primary={`${entry.location}: ${entry.amount}`} />
                </ListItem>
            ))}
        </List>
    )
}

export default Submitbutton
