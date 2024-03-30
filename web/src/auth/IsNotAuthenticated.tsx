import { AuthContextProps, hasAuthParams } from 'react-oidc-context'

const isAuthenticationInProgress = (auth: AuthContextProps) =>
    !auth.activeNavigator && !auth.isLoading

const isAuthenticated = (auth: AuthContextProps) =>
    !auth.isAuthenticated && isAuthenticationInProgress(auth)

export const isNotAuthenticated = (auth: AuthContextProps) =>
    !hasAuthParams() && isAuthenticated(auth)
