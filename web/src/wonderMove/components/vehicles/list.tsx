import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getVehicles } from '../../services/vehicles.ts'
import SearchVehicle from './searchVehicle.tsx'
import Vehicle from './view.tsx'

interface VehicleListProps {}
const VehicleList: React.FC<VehicleListProps> = () => {
    const navigate = useNavigate()
    const [vehicles, setVehicles] = useState<string[]>([])
    const [selectedVehicle, setSelectedVehicle] = useState([0])

    useEffect(() => {
        // @ts-ignore
        getVehicles().then(setVehicles.toString())
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
