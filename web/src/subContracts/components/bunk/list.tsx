import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllFuelReport } from '../../services/fuel'
import FuelReportList from './fuelReport/fuelReportTable'
const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'right'
}

const Header: React.FC = () => (
    <div style={{ ...style }}>
        <Link to={'/sub/bunk/fuel'}>
            <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                Add Fuel
            </Button>
        </Link>
    </div>
)
const BunkList: React.FC = () => {
    const [fuelReportData, setfuelReportData] = useState([])
    useEffect(() => {
        getAllFuelReport().then((data) => {
            setfuelReportData(data)
        })
    }, [])

    return (
        <>
            <Header />
            <FuelReportList fuelReportData={fuelReportData} />
        </>
    )
}

export default BunkList
