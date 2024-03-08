import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { router } from './routes.tsx'

export const App = () => {
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
