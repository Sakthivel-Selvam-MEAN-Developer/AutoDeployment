import { useReducer, useState } from 'react'
import FuelReportList from './fuelReport/fuelReportTable'
import { dispatchData, filterData } from './fuelReport/fuelContext/fuelReportContext'
import { FuelListForm } from './fuelReport/form/FuelListForm'
import { updateFilterProps } from './fuelReport/fuelContext/updateFuelFilter'
import { initialFuelFilterData } from './fuelReport/fuelContext/fuelAction'

const BunkList: React.FC = () => {
    const [fuelReportData, setfuelReportData] = useState([])
    const [count, setCount] = useState<number>(0)
    const [filterIds, dispatch] = useReducer(updateFilterProps, initialFuelFilterData)
    return (
        <filterData.Provider value={filterIds}>
            <dispatchData.Provider value={{ dispatch }}>
                <h3 style={{ margin: '20px 0' }}>Fuel Report</h3>
                <FuelListForm setfuelReportData={setfuelReportData} setCount={setCount} />
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
