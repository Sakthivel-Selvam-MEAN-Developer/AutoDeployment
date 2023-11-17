import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getVehicles } from '../../services/vehicles.ts'
import SearchVehicle from './searchVehicle.tsx'
import Vehicle from './view.tsx'

interface VehicleListProps {}
const VehicleList: React.FC<VehicleListProps> = () => {
    const navigate = useNavigate()
    const [vehicles, setVehicles] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState([0])

    useEffect(() => {
        getVehicles().then((data) => {
            setVehicles(data)
        })
    }, [])

    return (
        <>
            <div
                style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                <Button color="primary" variant="contained" onClick={() => navigate('create')}>
                    Add New Vehicle
                </Button>
            </div>
            <SearchVehicle vehicles={vehicles} onSelect={setSelectedVehicle} />
            {selectedVehicle && <Vehicle number={selectedVehicle} />}
        </>
    )
}

export default VehicleList
