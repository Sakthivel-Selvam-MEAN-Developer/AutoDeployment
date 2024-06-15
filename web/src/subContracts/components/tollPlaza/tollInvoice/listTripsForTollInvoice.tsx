import { Typography, Button } from '@mui/material'

const ListTripsForTollInvoice: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>List of Trips for Invoice</Typography>
            <Button variant="contained">Download Invoice</Button>
        </div>
    )
}

export default ListTripsForTollInvoice
