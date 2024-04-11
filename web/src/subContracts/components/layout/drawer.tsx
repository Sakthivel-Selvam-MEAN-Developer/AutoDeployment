import IconButton from '@mui/material/IconButton'
import {
    Dashboard,
    ChevronRight,
    ChevronLeft,
    LocalShipping,
    Factory,
    Sell,
    Receipt,
    LocalGasStation,
    LibraryAddCheck,
    DirectionsBus,
    Summarize
} from '@mui/icons-material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import { styled, useTheme, Theme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import { DrawerHeader } from '../../../layout/drawerHeader.ts'
import DrawerListItem from '../../../layout/drawerListItem.tsx'
import DrawerCollapse from './drawerCollapse.tsx'
import { CheckUser } from '../../../auth/checkUser.tsx'

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
    [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` }
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
const reportSubs = [
    { navigate: '/sub/reports/listAllTrip', name: 'Trip Status', icon: 'TS' },
    { navigate: '/sub/reports/upcomingdues', name: 'UpcomingPayment Dues', icon: 'UP' },
    {
        navigate: '/sub/reports/pendingacknowledgement',
        name: 'AcknowledgementAging Report',
        icon: 'AA'
    },
    { navigate: '/sub/reports/discrepancydues', name: 'DiscrepancyPayment Report', icon: 'DR' },
    { navigate: '/sub/reports/completedpayment', name: 'Completed Payments', icon: 'CP' }
]
const MiniDrawer = ({ handleDrawerClose, drawerState }: MiniDrawerProps) => {
    const theme = useTheme()
    const authoriser = CheckUser()
    console.log(authoriser)
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
                    navigate="/sub"
                    drawerState={drawerState}
                    index={0}
                    icon={<Dashboard />}
                />
                {authoriser && (
                    <DrawerListItem
                        text="Company"
                        navigate="/sub/company"
                        drawerState={drawerState}
                        index={1}
                        icon={<Factory />}
                    />
                )}
                {authoriser && (
                    <DrawerListItem
                        text="Transporter"
                        navigate="/sub/transporter"
                        drawerState={drawerState}
                        index={2}
                        icon={<DirectionsBus />}
                    />
                )}
                {authoriser && (
                    <DrawerListItem
                        text="Price Point"
                        navigate="/sub/price-point"
                        drawerState={drawerState}
                        index={3}
                        icon={<Sell />}
                    />
                )}
                <DrawerListItem
                    text="Trip"
                    navigate="/sub/trip"
                    drawerState={drawerState}
                    index={4}
                    icon={<LocalShipping />}
                />
                <DrawerListItem
                    text="Payment Dues"
                    navigate="/sub/payment-dues"
                    drawerState={drawerState}
                    index={5}
                    icon={<Receipt />}
                />
                <DrawerListItem
                    text="Bunk"
                    navigate="/sub/bunk"
                    drawerState={drawerState}
                    index={6}
                    icon={<LocalGasStation />}
                />
                {authoriser && (
                    <DrawerListItem
                        text="Acknowledgement"
                        navigate="/sub/acknowledgement"
                        drawerState={drawerState}
                        index={7}
                        icon={<LibraryAddCheck />}
                    />
                )}
                {authoriser && (
                    <DrawerListItem
                        text="Invoice"
                        navigate="/sub/invoice"
                        drawerState={drawerState}
                        index={9}
                        icon={<Receipt />}
                    />
                )}
                <DrawerCollapse
                    index={8}
                    drawerState={drawerState}
                    text="Reports"
                    icon={<Summarize />}
                    subs={reportSubs}
                />
            </List>
        </Drawer>
    )
}

export default MiniDrawer
