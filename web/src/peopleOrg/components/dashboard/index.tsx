import { FC, ReactElement, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useSetAtom } from 'jotai/react'
import { userIdAtom } from '../layout/userAtom.tsx'
const outlet = () => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}></div>
            <Outlet />
        </>
    )
}
const HrmDashboard: FC = (): ReactElement => {
    const setUserId = useSetAtom(userIdAtom)
    const { employeeId } = useParams()
    useEffect(() => {
        setUserId(employeeId || '')
    }, [employeeId, setUserId])
    return outlet()
}

export default HrmDashboard
