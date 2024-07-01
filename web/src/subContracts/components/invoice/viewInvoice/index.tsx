import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const ViewInvoice: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>View Invoice</div>
            <Outlet />
        </>
    )
}

export default ViewInvoice
