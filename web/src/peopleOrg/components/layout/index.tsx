import * as React from 'react'
import Box from '@mui/material/Box'
import { DrawerHeader } from './drawerHeader.ts'
import MiniDrawer from './MiniDrawer.tsx'
import { Outlet } from 'react-router-dom'
import { SwipeableDrawer } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { HeaderBar } from './headerBar.tsx'
const HrmLayout = () => {
    const theme = useTheme()
    const [state, setState] = React.useState({ left: false })
    const toggleDrawer =
        (anchor: 'left', open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            )
                return
            setState({ ...state, [anchor]: open })
        }
    const handleMenuIconClick = () =>
        setState((prevState) => ({ ...prevState, left: !prevState.left }))
    return (
        <Box sx={{ flexDirection: 'column', minHeight: '100vh' }}>
            <HeaderBar handleMenuIconClick={() => handleMenuIconClick()} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <SwipeableDrawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    <Box role="presentation" onClick={toggleDrawer('left', false)}>
                        <MiniDrawer />
                    </Box>
                </SwipeableDrawer>
                <DrawerHeader theme={theme} />
                <Outlet />
            </Box>
        </Box>
    )
}
export default HrmLayout
