import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const CreateCompany: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>CreateCompany</div>
            <Outlet />
        </>
    )
}

export default CreateCompany
