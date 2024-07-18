import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const CompanyAdvisoryIndex: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Company Advisory</div>
            <Outlet />
        </>
    )
}

export default CompanyAdvisoryIndex
