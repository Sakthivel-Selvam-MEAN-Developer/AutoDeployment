import { FC, ReactElement } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

interface DrawerListItemProps {
    text: string;
    drawerState: boolean;
    index: number;
    navigate: string;
    icon: ReactElement;
}
const DrawerListItem: FC<DrawerListItemProps> = ({ text, drawerState, index, navigate, icon }) => {
    const navigateFunction = useNavigate()
    return (
        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: drawerState ? 'initial' : 'center',
                    px: 2.5,
                }}
                onClick={() => navigateFunction(navigate)}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: drawerState ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    title={text}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={<div>{text}</div>}
                    sx={{ opacity: drawerState ? 1 : 0 }}
                />
            </ListItemButton>
        </ListItem>
    )
}

DrawerListItem.propTypes = {
    text: PropTypes.string.isRequired,
    drawerState: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    icon: PropTypes.element.isRequired,
    navigate: PropTypes.string.isRequired,
}

export default DrawerListItem
