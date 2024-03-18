import Keycloak from 'keycloak-js'
import config from '../config.ts'

export const client = new Keycloak({
    url: `${config.keycloakUrl}`,
    realm: 'WonderWhy',
    clientId: 'wonderwhyclient'
})
