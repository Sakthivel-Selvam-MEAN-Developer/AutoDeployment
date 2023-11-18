import { useEffect, useState } from 'react'
import { FrontendApi, Configuration, Session, Identity } from '@ory/client'

// Get your Ory url from .env
// Or localhost for local development
const basePath = 'http://localhost:4000'
const ory = new FrontendApi(
    new Configuration({
        basePath,
        baseOptions: {
            withCredentials: true
        }
    })
)

export const useAuth = () => {
    const [session, setSession] = useState<Session | undefined>()
    const [logoutUrl, setLogoutUrl] = useState<string | undefined>()

    // Returns either the email or the username depending on the user's Identity Schema
    const getUserName = (identity?: Identity) => identity?.traits.email || identity?.traits.username

    // Second, gather session data, if the user is not logged in, redirect to login
    useEffect(() => {
        ory.toSession()
            .then(({ data }) => {
                // User has a session!
                setSession(data)
                ory.createBrowserLogoutFlow().then(({ data }) => {
                    // Get also the logout url
                    setLogoutUrl(data.logout_url)
                })
            })
            .catch((err) => {
                console.error(err)
                // Redirect to login page
                window.location.replace(`${basePath}/ui/login`)
            })
    }, [])

    return { session, logoutUrl, getUserName }
}
