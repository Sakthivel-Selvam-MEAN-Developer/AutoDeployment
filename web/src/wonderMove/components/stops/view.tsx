import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getStopsByVehicle } from '../../services/stops'
import StopList from './show.js'

interface StopsProps {
    number: any;
}
const Stops: React.FC<StopsProps> = ({ number }) => {
    const [stopDetails, setStopDetails] = useState([])
    const [tableDataChanged, setTableDataChanged] = useState(false)

    const updateTableData = () => {
        setTableDataChanged((prev) => !prev)
    }
    const stopList = () => {
        getStopsByVehicle(number).then(setStopDetails)
    }

    useEffect(stopList, [number, tableDataChanged])

    return (
        <>
            {stopDetails && (
                <StopList
                    stopDetails={stopDetails}
                    tableState={updateTableData}
                />
            )}
        </>
    )
}
Stops.propTypes = {
    number: PropTypes.any,
}

export default Stops
