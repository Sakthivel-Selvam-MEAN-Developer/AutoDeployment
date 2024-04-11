import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ReactElement, useEffect, useState } from 'react'
import { getVehicles } from '../../services/vehicles.ts'
import SearchVehicle from './searchVehicle.tsx'
import Vehicle from './view.tsx'

interface VehicleListProps {}
const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'right'
}
const VehicleList: React.FC<VehicleListProps> = () => {
    const [vehicles, setVehicles] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState('')
    useEffect(() => {
        getVehicles().then((data) => setVehicles(data))
    }, [])
    return <>{vehicleList(vehicles, selectedVehicle, setSelectedVehicle)}</>
}

export default VehicleList
type vehicleType = (
    vehicles: unknown[],
    selectedVehicle: string,
    setSelectedVehicle: React.Dispatch<React.SetStateAction<string>>
) => ReactElement
const vehicleList: vehicleType = (vehicles, selectedVehicle, setSelectedVehicle) => {
    return (
        <>
            {Add_New_Vehicle()}
            <SearchVehicle vehicles={vehicles} onSelect={setSelectedVehicle} />
            {selectedVehicle && <Vehicle number={selectedVehicle} />}
        </>
    )
}
const Add_New_Vehicle = () => {
    const navigate = useNavigate()
    return (
        <div style={style}>
            <Button color="primary" variant="contained" onClick={() => navigate('create')}>
                Add New Vehicle
            </Button>
        </div>
    )
}
