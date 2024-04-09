import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { DrawerHeader } from '../../../layout/drawerHeader.ts'
import MiniDrawer from './drawer.tsx'
import { Outlet } from 'react-router-dom'

interface AppBarPropsWithOpen extends AppBarProps {
    open: boolean
}

const drawerWidth = 240

const AppBar = styled((props: AppBarPropsWithOpen) => <MuiAppBar {...props} />, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}))

function getIconButton(handleDrawerOpen: () => void, open: boolean) {
    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
        >
            <MenuIcon />
        </IconButton>
    )
}

export default function DriverSalaryLayout() {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const handleDrawerOpen = () => setOpen(true)
    const handleDrawerClose = () => setOpen(false)
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    {getIconButton(handleDrawerOpen, open)}
                    <Typography variant="h6" noWrap component="div">
                        Driver-Salary
                    </Typography>
                </Toolbar>
            </AppBar>
            <MiniDrawer handleDrawerClose={handleDrawerClose} drawerState={open} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader theme={theme} />
                <Outlet />
            </Box>
        </Box>
    )
}
