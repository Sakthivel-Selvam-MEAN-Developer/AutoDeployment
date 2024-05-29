import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllStockPointTrip } from '../../services/stockPointTrip'
import ListTrips from './listTrips'
const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none'
}
const TripList: React.FC = () => {
    const [allStockTrips, setAllStockTrips] = useState([])
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getAllStockPointTrip()
            .then(setAllStockTrips)
            .then(() => setLoading(false))
    }, [update])
    return (
        <>
            <Link to={'/sub/trip/add'} style={style}>
                <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                    Assign New Trip
                </Button>
            </Link>
            <ListTrips
                allStockTrips={allStockTrips}
                setUpdate={setUpdate}
                update={update}
                loading={loading}
            />
        </>
    )
}
export default TripList
