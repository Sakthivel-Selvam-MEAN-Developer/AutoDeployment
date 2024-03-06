import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { router } from './routes.tsx'
import useAuthorization from './authorization.tsx'

export const App = () => {
    useAuthorization()
    const routes = createBrowserRouter(router)
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <RouterProvider router={routes} />
            </ThemeProvider>
        </>
    )
}
