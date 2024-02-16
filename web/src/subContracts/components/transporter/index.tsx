import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Transporter: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Transporter</div>
            <Outlet />
        </>
    )
}

export default Transporter
