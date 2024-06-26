import { FC, useState } from 'react'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { DrawerListItemProps, subsProps } from './interface'

const DrawerCollapse: FC<DrawerListItemProps> = ({ subs, text, drawerState, index, icon }) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <>
            <ListItemButton sx={{ px: 2.5 }} onClick={handleClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={<div>{text}</div>} sx={{ opacity: drawerState ? 1 : 0 }} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} key={index} timeout="auto" unmountOnExit>
                <DrawerCollapseItem subs={subs} />
            </Collapse>
        </>
    )
}
export default DrawerCollapse

interface DrawerCollapseItemProps {
    subs: subsProps[]
}
const DrawerCollapseItem: FC<DrawerCollapseItemProps> = ({ subs }) => {
    const navigateFunction = useNavigate()
    return (
        <>
            {subs.map((subData, index) => {
                return (
                    <List key={index} disablePadding>
                        <ListItemButton
                            sx={{ pl: 3 }}
                            onClick={() => navigateFunction(subData.navigate)}
                        >
                            <ListItemIcon>{`${subData.icon}`} </ListItemIcon>
                            <ListItemText primary={subData.name} />
                        </ListItemButton>
                    </List>
                )
            })}
        </>
    )
}
