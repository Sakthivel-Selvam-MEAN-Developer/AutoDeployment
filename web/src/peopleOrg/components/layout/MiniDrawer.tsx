import { Dashboard, Badge, ThreeP } from '@mui/icons-material'
import List from '@mui/material/List'
import { DrawerHeader } from './drawerHeader.ts'
import DrawerListItem from './drawerListItem.tsx'
import React from 'react'
import { Divider, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { userIdAtom } from './userAtom.tsx'
import { useAtomValue } from 'jotai/react'
import { Theme } from '@mui/material/styles'

const dashBoardItem = (userId: string) => {
    return (
        <DrawerListItem
            text="Dashboard"
            navigate={`/hrm/dashboard/${userId}`}
            index={0}
            icon={<Dashboard />}
        />
    )
}
const approvalItem = () => {
    return <DrawerListItem text="Approval" navigate="/hrm/approval" index={2} icon={<Badge />} />
}
const leavesItem = () => {
    return <DrawerListItem text="Leaves" navigate="/hrm/leaves" index={3} icon={<ThreeP />} />
}
const drawerBody = (userId: string, theme: Theme) => {
    return (
        <>
            {drawerHeader(theme)}
            <Divider />
            {list(userId)}
        </>
    )
}
const MiniDrawer = () => {
    const theme = useTheme()
    const userId = useAtomValue(userIdAtom)
    return <React.Fragment>{drawerBody(userId, theme)}</React.Fragment>
}

export default MiniDrawer
const drawerHeader = (theme: Theme) => {
    return (
        <DrawerHeader theme={theme}>
            <IconButton></IconButton>
        </DrawerHeader>
    )
}

function list(userId: string) {
    return (
        <List>
            {dashBoardItem(userId)}
            {approvalItem()}
            {leavesItem()}
        </List>
    )
}
