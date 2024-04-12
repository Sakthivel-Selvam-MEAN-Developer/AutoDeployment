import { useAuth } from 'react-oidc-context'

const userName = ['vignesh', 'santhosh', 'suresh', 'wonderwhy']

export const CheckUser = () => {
    const auth = useAuth()
    if (auth && auth.user && auth.user.profile.preferred_username)
        return userName.includes(auth.user?.profile.preferred_username)
    return false
}
