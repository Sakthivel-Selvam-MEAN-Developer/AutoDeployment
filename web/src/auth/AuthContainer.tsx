import { AuthContextProps, hasAuthParams, useAuth } from 'react-oidc-context'
import { AuthProps } from './Auth.tsx'
import { useEffect, useState } from 'react'
import { initAxios } from '../apiCalls'

// eslint-disable-next-line complexity
function isNotAuthenticated(auth: AuthContextProps, hasTriedSignin: boolean) {
    return (
        !hasAuthParams() &&
        !auth.isAuthenticated &&
        !auth.activeNavigator &&
        !auth.isLoading &&
        !hasTriedSignin
    )
}

const updateAxiosAuth = (auth: AuthContextProps) => {
    if (auth.user) {
        initAxios(auth.user.access_token)
    }
}

export const AuthContainer = (props: AuthProps) => {
    const auth = useAuth()
    const [hasTriedSignin, setHasTriedSignin] = useState(false)
    useEffect(() => {
        if (isNotAuthenticated(auth, hasTriedSignin))
            auth.signinRedirect().then(() => setHasTriedSignin(true))
        updateAxiosAuth(auth)
    }, [auth, hasTriedSignin])
    return <>{props.children}</>
}
