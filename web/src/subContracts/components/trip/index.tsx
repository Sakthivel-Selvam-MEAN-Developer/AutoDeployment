import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Trip: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Trip</div>
            <Outlet />
        </>
    )
}

export default Trip
