import { Router } from 'express'
// @ts-expect-error module missing
import jwt from 'jsonwebtoken'
import configs from './config.ts'
import keycloak from './keycloak-config.ts'

export function hasRole(role: string) {
    return async function (req: any, res: any, next: any) {
        const { PUBLIC_KEY } = configs
        const { token } = req.kauth.grant.access_token
        const publickey = `-----BEGIN PUBLIC KEY-----\n${PUBLIC_KEY}\n-----END PUBLIC KEY-----`
        if (token == null) return res.sendStatus(401)
        const decodedToken = await jwt.decode(token)
        const userRoles = decodedToken.realm_access.roles
        await jwt.verify(token, publickey, { algorithms: ['RS256'] }, async (err: Error) => {
            if (err) {
                // decoded: any
                // console.error('Token verification failed:', err)
            }
            // console.log('Token verified successfully:', decoded.name, decoded.email)
            if (userRoles[0] === role) {
                return next()
            }
            return res.sendStatus(403)
        })
    }
}
const authorization = (router: Router) => {
    router.get('/auth', keycloak.protect(), hasRole('Admin'), async (_req, res) => {
        console.log('In')
        res.sendStatus(200)
    })
}

export default authorization
