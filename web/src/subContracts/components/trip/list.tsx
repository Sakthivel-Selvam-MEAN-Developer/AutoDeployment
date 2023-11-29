import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const TripList: React.FC = () => {
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
            <p>List Of Vehicle</p>
        </>
    )
}

export default TripList
