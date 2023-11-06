import {styled, Theme} from "@mui/material/styles";

interface DrawerHeaderProps {
    theme: Theme
}
export const DrawerHeader = styled('div')<DrawerHeaderProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));