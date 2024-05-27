import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const AcknowledgementApproval: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Final Pay Approval</div>
            <Outlet />
        </>
    )
}

export default AcknowledgementApproval
