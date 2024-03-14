import Keycloak from 'keycloak-js'

export const client = new Keycloak({
    url: 'http://keycloak:8080',
    realm: 'WonderWhy',
    clientId: 'wonderwhyclient'
})
