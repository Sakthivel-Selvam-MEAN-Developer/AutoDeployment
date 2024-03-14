import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const DriverSalaryDashboard: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Dashboard</div>
            <Outlet />
        </>
    )
}

export default DriverSalaryDashboard
