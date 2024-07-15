import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { style } from './types'

const Header: React.FC = () => (
    <div style={style}>
        Bunk
        <Link to={'/sub/bunk/fuel'}>
            <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                Add Fuel
            </Button>
        </Link>
    </div>
)

export default Header
