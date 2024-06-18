import { Typography, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { getOverallTripWithTollDetailsNotEmpty } from '../../../services/tollPlaza'
import { overallTrip, trip } from '../type'
import AlignTripDetails from './alignTripDetails'

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
}
interface props {
    trip: trip
    toll: overallTrip['tollPlaza']
}
const getTrip = (overallTrip: overallTrip[]) => {
    return overallTrip.map((trip) => {
        if (trip.loadingPointToUnloadingPointTrip)
            return { trip: trip.loadingPointToUnloadingPointTrip, toll: trip.tollPlaza }
        else return { trip: trip.loadingPointToStockPointTrip, toll: trip.tollPlaza }
    })
}
const ListTripsForTollInvoice: React.FC = () => {
    const [trips, setTrips] = useState<props[]>([])
    useEffect(() => {
        getOverallTripWithTollDetailsNotEmpty().then((overAlltripDetails) => {
            setTrips(getTrip(overAlltripDetails))
        })
    }, [])
    return (
        <>
            <div style={style}>
                <Typography>List of Trips for Invoice</Typography>
                <Button variant="contained">Download Invoice</Button>
            </div>
            <AlignTripDetails trip={trips} />
        </>
    )
}

export default ListTripsForTollInvoice
