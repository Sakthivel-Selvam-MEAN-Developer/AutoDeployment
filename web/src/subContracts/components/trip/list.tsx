import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const TripList: React.FC = () => {
    const navigate = useNavigate()

    return (
        <>
            <div
                style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                <Button color="primary" variant="contained" onClick={() => navigate('add')}>
                    Assign New Trip
                </Button>
            </div>
            <p>List Of Vehicle</p>
        </>
    )
}

export default TripList
