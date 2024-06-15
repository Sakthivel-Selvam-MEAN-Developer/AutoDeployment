import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const TollPlaza: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Toll Plaza</div>
            <Outlet />
        </>
    )
}

export default TollPlaza
