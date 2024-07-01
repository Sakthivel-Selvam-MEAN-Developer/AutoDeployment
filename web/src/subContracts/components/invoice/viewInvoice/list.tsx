import { Typography } from '@mui/material'
import InvoiceTable from './table'
const ViewList: React.FC = () => {
    return (
        <>
            <Typography sx={{ fontWeight: 'bold' }}>View Generated Invoice</Typography>
            <InvoiceTable />
        </>
    )
}

export default ViewList
