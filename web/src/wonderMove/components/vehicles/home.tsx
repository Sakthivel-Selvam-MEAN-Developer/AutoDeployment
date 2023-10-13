import { Outlet } from 'react-router-dom'

const VehiclesHome: React.FC = () => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Vehicles</div>
            <Outlet />
        </>
    )
}

export default VehiclesHome
