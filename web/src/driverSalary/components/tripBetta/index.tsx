import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const TripBetta: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Trip Betta</div>
            <Outlet />
        </>
    )
}

export default TripBetta
