import { useAuth } from 'react-oidc-context'

const userName = ['vignesh', 'santhosh', 'suresh']

export const CheckUser = () => {
    const auth = useAuth()
    if (auth.user !== undefined && auth.user?.profile.preferred_username !== undefined)
        return userName.includes(auth.user?.profile.preferred_username)
    return false
}
