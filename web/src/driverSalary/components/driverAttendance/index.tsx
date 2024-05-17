import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const DriverAttendance: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Driver Attendance</div>
            <Outlet />
        </>
    )
}

export default DriverAttendance
