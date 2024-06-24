import { Button } from '@mui/material'
import { useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import FuelReportList from './FuelReport/FuelReportTable'
import { updateFilterProps } from './FuelReport/FuelContext/UpdateFuelFilter'
import { filterData, dispatchData } from './FuelReport/FuelContext/FuelReportContext'
import { FuelListForm } from './FuelReport/form/FuelListForm'
import { initialFuelFilterData } from './FuelReport/FuelContext/FuelAction'
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
    const [count, setCount] = useState<number>(0)
    const [filterIds, dispatch] = useReducer(updateFilterProps, initialFuelFilterData)

    return (
        <filterData.Provider value={filterIds}>
            <dispatchData.Provider value={{ dispatch }}>
                <FuelListForm setfuelReportData={setfuelReportData} setCount={setCount} />
                <Header />
                <FuelReportList
                    setfuelReportData={setfuelReportData}
                    fuelReportData={fuelReportData}
                    count={count}
                    setCount={setCount}
                />
            </dispatchData.Provider>
        </filterData.Provider>
    )
}

export default BunkList
