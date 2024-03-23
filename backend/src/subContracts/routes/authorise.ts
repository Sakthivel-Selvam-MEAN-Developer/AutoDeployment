import keycloak from '../../keycloak-config.ts'
import { Role } from '../roles.ts'
import logger from '../../logger.ts'

const hasValidRole = (roles: Role[], token: any) => {
    roles.push('SuperAdmin')
    const tokenRoles = token.content.realm_access.roles
    logger.info('Token roles:', tokenRoles)
    return roles.find((role) => tokenRoles.includes(role)) !== undefined
}

export const authorise = (roles: Role[] = ['Employee']) => {
    const validateTokenRoles = (token: any) => {
        if (token.isExpired()) return false
        return hasValidRole(roles, token)
    }
    return keycloak.protect(validateTokenRoles)
}
