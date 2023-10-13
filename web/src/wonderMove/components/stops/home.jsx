import { Outlet } from 'react-router-dom'

const StopsHome = () => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Idling</div>
            <Outlet />
        </>
    )
}

export default StopsHome