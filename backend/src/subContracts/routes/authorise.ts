import { Token } from 'keycloak-connect'
import keycloak from '../../keycloak-config.ts'
import { Role } from '../roles.ts'

export const authorise = (roles: Role[] = []) => {
    const validateTokenRoles = (token: Token) => {
        if (token.isExpired()) {
            return false
        }
        roles.push('SuperAdmin')
        return roles.find(token.hasRealmRole) !== undefined
    }
    return keycloak.protect(validateTokenRoles)
}
