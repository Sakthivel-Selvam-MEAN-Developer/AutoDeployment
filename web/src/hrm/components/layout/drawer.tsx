import { Dashboard, Badge, ThreeP } from '@mui/icons-material'
import List from '@mui/material/List'
import { DrawerHeader } from './drawerHeader.ts'
import DrawerListItem from './drawerListItem.tsx'
import React from 'react'
import { Divider, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const MiniDrawer = () => {
    const theme = useTheme()

    return (
        <React.Fragment>
            <DrawerHeader theme={theme}>
                <IconButton></IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <DrawerListItem text="Dashboard" navigate="/hrm" index={0} icon={<Dashboard />} />
                <DrawerListItem
                    text="Approval"
                    navigate="/hrm/approval"
                    index={2}
                    icon={<Badge />}
                />
                <DrawerListItem text="Leaves" navigate="/hrm/leaves" index={3} icon={<ThreeP />} />
            </List>
        </React.Fragment>
    )
}

export default MiniDrawer
