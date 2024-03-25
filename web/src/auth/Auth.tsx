import * as React from 'react'
import { AuthProvider } from 'react-oidc-context'
import config from '../../config.ts'
import { AuthContainer } from './AuthContainer.tsx'
import { Log, WebStorageStateStore } from 'oidc-client-ts'

export interface AuthProps {
    children?: React.ReactNode
}

const oidcConfig = {
    authority: `${config.keycloakUrl}/realms/WonderWhy/`,
    client_id: 'wonderwhyclient',
    redirect_uri: window.location.href,
    responseType: 'code',
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    post_logout_redirect_uri: `${config.logoutRedirectUrl}`
}

Log.setLogger(console)
Log.setLevel(Log.DEBUG)

const Auth = (props: AuthProps) => {
    return (
        <AuthProvider {...oidcConfig}>
            <AuthContainer>{props.children}</AuthContainer>
        </AuthProvider>
    )
}

export default Auth
