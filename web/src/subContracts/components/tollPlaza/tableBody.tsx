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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const entriesToSubmit = tollEntries.map(({ location, ...rest }) => rest)
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
