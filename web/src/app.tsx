import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'

export const App = () => {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <RouterProvider router={createBrowserRouter(router)} />
            </ThemeProvider>
        </>
    )
}
