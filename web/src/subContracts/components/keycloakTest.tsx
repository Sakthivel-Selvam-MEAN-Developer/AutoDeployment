import Keycloak from 'keycloak-js'

export const client = new Keycloak({
    url: 'http://localhost:0000',
    realm: 'WonderWhyTest',
    clientId: 'wonderwhyclienttest'
})
export const client1 = new Keycloak({
    url: 'http://localhost:0000',
    realm: 'WonderWhyTest',
    clientId: 'wonderwhyclienttest'
})
