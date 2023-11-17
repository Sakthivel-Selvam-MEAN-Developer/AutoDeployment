import { Auth0Provider } from '@auth0/auth0-react'
import { ChildrenProps } from './childrenProps.tsx'

const Auth = ({ children }: ChildrenProps) => {
    {
        return (
            <Auth0Provider
                domain="wonderwhy.us.auth0.com"
                clientId="6uWduyG2yw9vW3V3JGMmNkKH9L8ycwcE"
                authorizationParams={{
                    redirect_uri: window.location.origin
                }}
            >
                {children}
            </Auth0Provider>
        )
    }
}
export default Auth
