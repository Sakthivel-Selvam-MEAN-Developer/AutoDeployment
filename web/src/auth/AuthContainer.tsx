import { useAuth } from 'react-oidc-context'
import { AuthProps } from './Auth.tsx'
import { useEffect } from 'react'
import { isNotAuthenticated } from './IsNotAuthenticated.tsx'
import { LoadAfterAuth } from './LoadAfterAuth.tsx'

export const AuthContainer = (props: AuthProps) => {
    const auth = useAuth()
    useEffect(() => {
        if (isNotAuthenticated(auth)) auth.signinRedirect()
    }, [auth])
    return <LoadAfterAuth> {props.children} </LoadAfterAuth>
}
