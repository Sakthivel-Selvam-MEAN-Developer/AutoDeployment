import Keycloak from 'keycloak-js'
import config from '../../config.ts'

export const keycloak = new Keycloak({
    url: `${config.keycloakUrl}`,
    realm: 'WonderWhy',
    clientId: 'wonderwhyclient'
})
