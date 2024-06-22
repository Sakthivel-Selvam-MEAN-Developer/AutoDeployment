import { Typography, Button } from '@mui/material'
import { tripProp } from './displayTripDetails'
import { FC } from 'react'
import { style } from './type'

interface indexProps {
    trips: tripProp[]
    setDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const handlePreview = (
    trips: tripProp[],
    setDialog: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (trips.length !== 0) setDialog(true)
}

const TollIndex: FC<indexProps> = ({ trips, setDialog }) => {
    return (
        <div style={style}>
            <Typography>List of Trips for Invoice</Typography>
            <Button variant="contained" onClick={() => handlePreview(trips, setDialog)}>
                Preview Invoice
            </Button>
        </div>
    )
}
export default TollIndex
