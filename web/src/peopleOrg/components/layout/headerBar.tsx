import { StyledAppBar } from './styledAppBar.tsx'
import Toolbar from '@mui/material/Toolbar'
import { IconButton, ListItemSecondaryAction } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { getEmployeeName } from '../../services/employees.ts'
import { userIdAtom } from './userAtom.tsx'
import { useAtomValue } from 'jotai/react'

interface HeaderBarProps {
    handleMenuIconClick: () => void
}

export function HeaderBar(props: HeaderBarProps) {
    const [username, setUserName] = useState('')
    const userId = useAtomValue(userIdAtom)

    useEffect(() => {
        if (!userId) return
        getEmployeeName(userId).then((employee) => {
            setUserName(employee.name)
        })
    }, [userId])
    return (
        <StyledAppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => props.handleMenuIconClick()}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    P&C
                </Typography>
                <ListItemSecondaryAction>{username}</ListItemSecondaryAction>
            </Toolbar>
        </StyledAppBar>
    )
}
