import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Report: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Report</div>
            <Outlet />
        </>
    )
}

export default Report
