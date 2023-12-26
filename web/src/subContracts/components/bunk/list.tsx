import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
const BunkList: React.FC = () => {
    return (
        <>
            <div
                style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                <Link to={'/sub/bunk/fuel'}>
                    <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                        Add Fuel
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default BunkList
