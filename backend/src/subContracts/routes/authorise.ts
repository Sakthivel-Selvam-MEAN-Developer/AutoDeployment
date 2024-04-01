// import keycloak from '../../keycloak-config.ts'
// import { Role } from '../roles.ts'
// import logger from '../../logger.ts'

// const hasValidRole = (roles: Role[], token: any) => {
//     roles.push('SuperAdmin')
//     const tokenRoles = token.content.realm_access.roles
//     logger.info('Token roles:', tokenRoles)
//     console.log(roles.find((role) => tokenRoles.includes(role)) !== undefined)
//     return roles.find((role) => tokenRoles.includes(role)) !== undefined
// }

// export const authorise = (roles: Role[] = ['Employee']) => {
//     const validateTokenRoles = (token: any) => {
//         if (token.isExpired()) return false
//         return hasValidRole(roles, token)
//     }
//     return keycloak.protect(validateTokenRoles)
// }

import { NextFunction, Request, Response } from 'express'
import { Role } from '../roles.ts'
import logger from '../../logger.ts'

export const authorise = (roles: Role[] = []) => {
    logger.info('role', roles)
    return (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}
