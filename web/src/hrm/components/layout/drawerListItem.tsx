import { FC, ReactElement } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useNavigate } from 'react-router-dom'

interface DrawerListItemProps {
    text: string;
    index: number;
    navigate: string;
    icon: ReactElement;
}
const DrawerListItem: FC<DrawerListItemProps> = ({ text, index, navigate, icon }) => {
    const navigateFunction = useNavigate()
    return (
        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                }}
                onClick={() => navigateFunction(navigate)}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: 2.5,
                        justifyContent: 'center',
                    }}
                    title={text}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={<div>{text}</div>}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default DrawerListItem
