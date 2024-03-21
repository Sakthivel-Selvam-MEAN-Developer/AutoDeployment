import * as React from 'react'
import { AuthProvider } from 'react-oidc-context'
import config from '../../config.ts'
import { AuthContainer } from './AuthContainer.tsx'

export interface AuthProps {
    children?: React.ReactNode
}

const oidcConfig = {
    authority: `${config.keycloakUrl}/realms/WonderWhy/`,
    client_id: 'wonderwhyclient',
    redirect_uri: `http://localhost:3003/sub`,
    responseType: 'code',
    scope: 'openid'
}

const Auth = (props: AuthProps) => {
    return (
        <AuthProvider {...oidcConfig}>
            <AuthContainer>{props.children}</AuthContainer>
        </AuthProvider>
    )
}

export default Auth
