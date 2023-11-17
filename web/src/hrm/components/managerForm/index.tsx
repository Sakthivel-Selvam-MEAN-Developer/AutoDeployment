import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const ManagerForm: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Manager Form</div>
            <Outlet />
        </>
    )
}

export default ManagerForm
