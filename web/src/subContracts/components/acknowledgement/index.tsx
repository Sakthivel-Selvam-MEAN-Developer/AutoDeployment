import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Acknowledgement: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Acknowledgement</div>
            <Outlet />
        </>
    )
}

export default Acknowledgement
