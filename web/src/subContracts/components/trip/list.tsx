import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ListAllTrip from './show'
import { useEffect, useState } from 'react'
import { getAllTrip } from '../../services/trip'
import { getAllStockPointTrip } from '../../services/stockPointTrip'

const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'right'
}

const TripList: React.FC = () => {
    const [allTrips, setAllTrips] = useState([])
    const [allStockTrips, setAllStockTrips] = useState([])
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        getAllTrip().then(setAllTrips)
        getAllStockPointTrip().then(setAllStockTrips)
    }, [update])
    return (
        <>
            <div style={style}>
                <Link to={'/sub/trip/add'}>
                    <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                        Assign New Trip
                    </Button>
                </Link>
            </div>
            <p>List Of Trips</p>
            <ListAllTrip
                allTrips={allTrips}
                allStockTrips={allStockTrips}
                setUpdate={setUpdate}
                update={update}
            />
        </>
    )
}
export default TripList
