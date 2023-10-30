import { createTheme, Theme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#8BC34A',
        },
        secondary: {
            main: '#FFC107',
        },
        error: {
            main: red.A400,
        },
    },
});
