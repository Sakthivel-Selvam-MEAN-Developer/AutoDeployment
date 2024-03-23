import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getVehicleDetails } from '../../services/vehicles.ts'
import UpdateVehicle from './update.tsx'
import { reformatVehicleDate } from './reformatVehicleDate.ts'

interface VehicleProps {
    number: string
}

interface VehicleDetails {}
const Vehicle: React.FC<VehicleProps> = ({ number }) => {
    const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails | undefined>()
    const updateVehicleList = () => {
        getVehicleDetails(number).then(reformatVehicleDate).then(setVehicleDetails)
    }
    useEffect(updateVehicleList, [number])
    return (
        <>
            {vehicleDetails && (
                <div style={{ marginTop: '20px' }}>
                    <UpdateVehicle vehicleDetails={vehicleDetails} />
                </div>
            )}
        </>
    )
}
Vehicle.propTypes = {
    number: PropTypes.any
}

export default Vehicle
