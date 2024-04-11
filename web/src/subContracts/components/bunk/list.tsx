import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'right'
}
const submitButton = (
    <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
        Add Fuel
    </Button>
)
const BunkList: React.FC = () => {
    return (
        <div style={style}>
            <Link to={'/sub/bunk/fuel'}>{submitButton}</Link>
        </div>
    )
}

export default BunkList
