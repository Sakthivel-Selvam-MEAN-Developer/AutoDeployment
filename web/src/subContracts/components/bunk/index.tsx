import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Bunk: React.FC = (): ReactElement => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default Bunk
