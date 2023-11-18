<<<<<<< Updated upstream
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'
import Auth from './Auth'
import LoginButton from './Auth/LoginButton.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <Auth>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <LoginButton />
                <RouterProvider router={router} />
            </ThemeProvider>
        </Auth>
    </>
)
=======
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(App);
>>>>>>> Stashed changes
