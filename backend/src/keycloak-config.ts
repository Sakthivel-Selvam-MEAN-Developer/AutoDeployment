import Keycloak from 'keycloak-connect'
import configs from './config.ts'

const keycloakConfig: any = {
    clientId: 'wonderwhyclient',
    bearerOnly: true,
    serverUrl: `${configs.Keycloak_URL}`,
    realm: 'WonderWhy'
}
const keycloak = new Keycloak({ scope: 'openid' }, keycloakConfig)
export default keycloak
