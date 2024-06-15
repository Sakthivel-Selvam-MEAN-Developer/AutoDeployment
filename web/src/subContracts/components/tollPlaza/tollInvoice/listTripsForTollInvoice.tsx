import { Typography, Button } from '@mui/material'
import TripsDataGrid from '../dataGrid'
import { useState, useEffect } from 'react'
import { getOverallTripWithTollDetailsNotEmpty } from '../../../services/tollPlaza'
import { overallTrip } from '../type'

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
}
const ListTripsForTollInvoice: React.FC = () => {
    const [trips, setTrips] = useState<overallTrip>({} as overallTrip)
    console.log(trips)
    useEffect(() => {
        getOverallTripWithTollDetailsNotEmpty().then(setTrips)
    }, [])
    return (
        <>
            <div style={style}>
                <Typography>List of Trips for Invoice</Typography>
                <Button variant="contained">Download Invoice</Button>
            </div>
            <TripsDataGrid row={[]} column={[]} />
        </>
    )
}

export default ListTripsForTollInvoice
