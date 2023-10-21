import { Outlet } from 'react-router-dom'

const StopsHome: React.FC = () => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Stops</div>
            <Outlet />
        </>
    )
}

export default StopsHome