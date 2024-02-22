import Keycloak from 'keycloak-js'

export const client = new Keycloak({
    url: 'http://localhost:6001',
    realm: 'WonderWhy',
    clientId: 'wonderwhyclient'
})
