import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { DrawerHeader } from '../../../layout/drawerHeader.ts'
import MiniDrawer from './drawer.tsx'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

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

const BoxMain = () => {
    const theme = useTheme()
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader theme={theme} />
            <Outlet />
        </Box>
    )
}

const MoveItLayout = () => {
    const [open, setOpen] = React.useState(false)
    return (
        <Box sx={{ display: 'flex' }}>
            {appBar(open, setOpen)}
            <MiniDrawer handleDrawerClose={() => setOpen(false)} drawerState={open} />
            <BoxMain />
        </Box>
    )
}

const toolBar = (setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean) => {
    return (
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(true)}
                edge="start"
                sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' })
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                MoveIt
            </Typography>
        </Toolbar>
    )
}
function appBar(open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    return (
        <AppBar position="fixed" open={open}>
            {toolBar(setOpen, open)}
        </AppBar>
    )
}

export default MoveItLayout
