import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const ListTrips: FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>List of Trips</Typography>
            <Link to={'/sub/tollPlaza/tollInvoice'}>
                <Button variant="contained">Download Invoice</Button>
            </Link>
        </div>
    )
}

export default ListTrips
