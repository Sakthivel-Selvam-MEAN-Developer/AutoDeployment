import { Outlet } from 'react-router-dom'

const PendingReasonHome = () => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Pending Reasons</div>
            <Outlet />
        </>
    )
}

export default PendingReasonHome