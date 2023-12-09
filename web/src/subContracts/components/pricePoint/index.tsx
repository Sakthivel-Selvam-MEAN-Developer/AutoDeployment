import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const PricePoint: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>PricePoint</div>
            <Outlet />
        </>
    )
}

export default PricePoint
