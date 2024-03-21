import { useAuth } from 'react-oidc-context'
import { AuthProps } from './Auth.tsx'
import { useEffect } from 'react'
import { initAxios } from '../apiCalls'

export const AuthContainer = (props: AuthProps) => {
    const auth = useAuth()
    useEffect(() => {
        auth.user?.access_token && initAxios(auth.user.access_token)
    }, [auth.user])
    return <>{props.children}</>
    // return <button onClick={() => void auth.signinRedirect()}>Log in</button>
}
