import IconButton from '@mui/material/IconButton'
import {
    Dashboard,
    ChevronRight,
    ChevronLeft,
    LocalShipping,
    Badge,
    Upload,
    LocalParking,
    Article
} from '@mui/icons-material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import { Theme, styled, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import { DrawerHeader } from '../../../layout/drawerHeader.ts'
import DrawerListItem from '../../../layout/drawerListItem.tsx'

interface MiniDrawerProps {
    handleDrawerClose: () => void
    drawerState: boolean
}
const drawerWidth = 240

const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
})

const closedMixin = (theme: Theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
})

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }: any) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}))
const MiniDrawer = ({ handleDrawerClose, drawerState }: MiniDrawerProps) => {
    const theme = useTheme()

    return (
        <Drawer variant="permanent" open={drawerState}>
            <DrawerHeader theme={theme}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <DrawerListItem
                    text="Dashboard"
                    navigate="/moveit"
                    drawerState={drawerState}
                    index={0}
                    icon={<Dashboard />}
                />
                <DrawerListItem
                    text="Reason"
                    navigate="/moveit/reason"
                    drawerState={drawerState}
                    index={1}
                    icon={<Article />}
                />
                <DrawerListItem
                    text="PendingReason"
                    navigate="/moveit/pending-reasons"
                    drawerState={drawerState}
                    index={2}
                    icon={<Upload />}
                />
                <DrawerListItem
                    text="Stops"
                    navigate="/moveit/stops"
                    drawerState={drawerState}
                    index={3}
                    icon={<LocalParking />}
                />
                <DrawerListItem
                    text="Vehicle"
                    navigate="/moveit/vehicles"
                    drawerState={drawerState}
                    index={4}
                    icon={<LocalShipping />}
                />
                <DrawerListItem
                    text="Customer"
                    navigate="/moveit/customers"
                    drawerState={drawerState}
                    index={5}
                    icon={<Badge />}
                />
            </List>
        </Drawer>
    )
}

export default MiniDrawer
