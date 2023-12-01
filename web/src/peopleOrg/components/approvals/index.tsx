import React, { ReactElement } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { IconButton } from '@mui/material'

const Approvals: React.FC = (): ReactElement => {
    const navigate = useNavigate()

    return (
        <>
            <IconButton onClick={() => navigate(-1)}>
                <KeyboardBackspaceIcon />
            </IconButton>
            <div style={{ marginBottom: '30px' }}>Approval</div>
            <Outlet />
        </>
    )
}

export default Approvals
