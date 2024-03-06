import { useKeycloak } from '@react-keycloak/web'
import { getAuthorization } from './authService.tsx'
function useAuthorization() {
    const { keycloak } = useKeycloak()
    const token = keycloak.token
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    keycloak.token && console.log(config)
    if (keycloak.hasRealmRole('SuperAdmin')) console.log(true)
    keycloak.token && getAuthorization(config).then(() => console.log('passed'))
}
export default useAuthorization
