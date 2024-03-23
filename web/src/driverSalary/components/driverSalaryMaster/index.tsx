import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const DriverSalary: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Driver Salary Details</div>
            <Outlet />
        </>
    )
}

export default DriverSalary
