import keycloak from '../../keycloak-config.ts'
import { Role } from '../roles.ts'

export const authorise = (roles: Role[] = []) => {
    const validateTokenRoles = (token: any) => {
        if (token.isExpired()) return false
        roles.push('SuperAdmin')
        const tokenRoles = token.content.realm_access.roles
        return roles.find((role) => tokenRoles.includes(role)) !== undefined
    }
    return keycloak.protect(validateTokenRoles)
}
