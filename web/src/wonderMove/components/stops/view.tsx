import { useEffect, useState } from 'react'
import { getStopsByVehicle } from '../../services/stops'
import StopList from './show.js'

interface StopsProps {
    number: string
}
const Stops: React.FC<StopsProps> = ({ number }) => {
    const [stopDetails, setStopDetails] = useState([])
    const [tableDataChanged, setTableDataChanged] = useState(false)
    const updateTableData = () => setTableDataChanged((prev) => !prev)
    useEffect(() => {
        getStopsByVehicle(number).then(setStopDetails)
    }, [number, tableDataChanged])
    return <>{stopDetails && <StopList stopDetails={stopDetails} tableState={updateTableData} />}</>
}

export default Stops
