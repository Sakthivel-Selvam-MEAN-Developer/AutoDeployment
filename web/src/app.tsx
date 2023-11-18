import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'
import { useAuth } from './Auth/ory'

export const App = () => {
    const { session, logoutUrl, getUserName } = useAuth()
    console.log('App: session: ', session, logoutUrl, getUserName())
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    )
}
