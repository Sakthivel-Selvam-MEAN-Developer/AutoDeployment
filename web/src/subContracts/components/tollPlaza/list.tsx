import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none'
}

const SubContractDashboardList: React.FC = () => {
    return (
        <>
            <Link to={'  '} style={style}>
                <Button>Display all Trip</Button>
            </Link>
        </>
    )
}

export default SubContractDashboardList
