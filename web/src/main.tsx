// import '../old/index.css'
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './wonderMove/theme.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './wonderMove/routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </>
);
