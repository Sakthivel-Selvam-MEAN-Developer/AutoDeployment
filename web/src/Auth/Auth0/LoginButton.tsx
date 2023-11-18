import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'

function LoginButton() {
    const { isAuthenticated, loginWithRedirect } = useAuth0()
    console.log('LoginButton: isAuthenticated: ', isAuthenticated)
    return (
        !isAuthenticated && (
            <Button color="inherit" onClick={loginWithRedirect}>
                Sign in
            </Button>
        )
    )
}

export default LoginButton
