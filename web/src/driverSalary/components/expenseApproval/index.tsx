import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const ExpenseApproval: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Driver</div>
            <Outlet />
        </>
    )
}

export default ExpenseApproval
