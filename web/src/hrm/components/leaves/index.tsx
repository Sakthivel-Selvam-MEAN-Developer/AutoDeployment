import { IconButton } from '@mui/material'
import React, { ReactElement } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const Leaves: React.FC = (): ReactElement => {
    const navigate = useNavigate()

    return (
        <>
            <IconButton onClick={() => navigate(-1)}>
                <KeyboardBackspaceIcon />
            </IconButton>
            <div style={{ marginBottom: '30px' }}>Leaves</div>
            <Outlet />
        </>
    )
}

export default Leaves
