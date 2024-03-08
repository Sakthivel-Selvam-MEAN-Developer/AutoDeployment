import { useKeycloak } from '@react-keycloak/web'
const useAuthorization = () => {
    const { keycloak } = useKeycloak()
    const token = keycloak.token
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    if (keycloak.token) return config
}
export default useAuthorization
