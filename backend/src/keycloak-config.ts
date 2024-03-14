import Keycloak from 'keycloak-connect'

const keycloakConfig: any = {
    clientId: 'wonderwhyclient',
    bearerOnly: true,
    serverUrl: 'http://keycloak:8080',
    realm: 'WonderWhy'
}
const keycloak = new Keycloak({ scope: 'openid' }, keycloakConfig)
console.log(keycloak)
export default keycloak
