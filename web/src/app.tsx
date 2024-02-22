import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'
import { useKeycloak } from '@react-keycloak/web'
import { getAuthorization } from './authService.tsx'

export const App = () => {
    const { keycloak } = useKeycloak()
    const token = keycloak.token
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    console.log(config)
    keycloak.token && getAuthorization(config).then(() => console.log('passed'))
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    )
}
