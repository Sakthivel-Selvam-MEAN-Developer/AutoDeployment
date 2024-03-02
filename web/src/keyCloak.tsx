import Keycloak from 'keycloak-js'

export const client = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'WonderWhy',
    clientId: 'wonderwhyclient'
})
