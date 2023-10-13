import { Outlet } from 'react-router-dom'

const StopsHome: React.FC = () => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Idling</div>
            <Outlet />
        </>
    )
}

export default StopsHome