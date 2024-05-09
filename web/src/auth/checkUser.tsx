import { useAuth } from 'react-oidc-context'

const adminUsers = ['vignesh', 'santhosh', 'suresh', 'wonderwhy', 'kalaiyarasan']
const semiUsers: string[] = []

export const CheckUser = () => {
    const auth = useAuth()
    const userName = auth.user?.profile.preferred_username
    if (auth && auth.user && auth.user.profile.preferred_username)
        return {
            adminAccess: adminUsers.includes(userName || ''),
            semiAccess: semiUsers.includes(userName || '')
        }
    return { adminAccess: false, semiAccess: false }
}
