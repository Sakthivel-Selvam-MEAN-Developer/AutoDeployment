import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Employee: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Employee</div>
            <Outlet />
        </>
    )
}

export default Employee
