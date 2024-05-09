import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const TransporterInvoice: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>TransporterInvoice</div>
            <Outlet />
        </>
    )
}

export default TransporterInvoice
