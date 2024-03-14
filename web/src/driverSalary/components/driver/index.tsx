import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Driver: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Driver</div>
            <Outlet />
        </>
    )
}

export default Driver
