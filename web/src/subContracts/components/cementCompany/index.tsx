import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const CementCompany: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>CementCompany</div>
            <Outlet />
        </>
    )
}

export default CementCompany
