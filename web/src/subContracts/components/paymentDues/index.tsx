import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const PaymentDues: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Payment Dues</div>
            <Outlet />
        </>
    )
}

export default PaymentDues
