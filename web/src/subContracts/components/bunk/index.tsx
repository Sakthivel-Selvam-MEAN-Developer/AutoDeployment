import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Bunk: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Fuel</div>
            <Outlet />
        </>
    )
}

export default Bunk
