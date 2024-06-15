import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const PricePointApproval: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>PricePoint Approval</div>
            <Outlet />
        </>
    )
}

export default PricePointApproval
