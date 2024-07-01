import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Invoice: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Invoice</div>
            <Outlet />
        </>
    )
}

export default Invoice
