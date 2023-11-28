import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const SubContractDashboard: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Dashboard</div>
            <Outlet />
        </>
    )
}

export default SubContractDashboard
