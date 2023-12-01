import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ListAllTrip from './show'
import { useEffect, useState } from 'react'
import { getAllTrip } from '../../services/trip'

const TripList: React.FC = () => {
    const [allTrips, setAllTrips] = useState([])

    useEffect(() => {
        getAllTrip().then(setAllTrips)
    }, [])
    return (
        <>
            <div
                style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                <Link to={'/sub/trip/add'}>
                    <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                        Assign New Trip
                    </Button>
                </Link>
            </div>
            <p>List Of Trips</p>
            <ListAllTrip allTrips={allTrips} />
        </>
    )
}

export default TripList
