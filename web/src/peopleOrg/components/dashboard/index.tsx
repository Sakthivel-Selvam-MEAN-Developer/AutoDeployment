import React, { ReactElement } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useSetAtom } from 'jotai/react'
import { userIdAtom } from '../layout/userAtom.tsx'

const HrmDashboard: React.FC = (): ReactElement => {
    const setUserId = useSetAtom(userIdAtom)
    const { employeeId } = useParams()
    React.useEffect(() => {
        setUserId(employeeId)
    }, [employeeId, setUserId])
    return (
        <>
            <div style={{ marginBottom: '30px' }}></div>
            <Outlet />
        </>
    )
}

export default HrmDashboard
