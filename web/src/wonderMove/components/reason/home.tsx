import { ReactElement } from "react";
import { Outlet } from 'react-router-dom'

const Reason: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Reasons</div>
            <Outlet />
        </>
    )
}

export default Reason