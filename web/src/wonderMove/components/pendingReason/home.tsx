import { Outlet } from 'react-router-dom'

const PendingReasonHome: React.FC = () => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Pending Reasons</div>
            <Outlet />
        </>
    )
}

export default PendingReasonHome