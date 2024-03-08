// @ts-expect-error module missing
import jwt from 'jsonwebtoken'
import configs from './config.ts'

export function hasRole(role: string) {
    return async function (req: any, res: any, next: any) {
        const { PUBLIC_KEY } = configs
        const { token } = req.kauth.grant.access_token
        const publickey = `-----BEGIN PUBLIC KEY-----\n${PUBLIC_KEY}\n-----END PUBLIC KEY-----`
        if (token == null) return res.sendStatus(401)
        const decodedToken = await jwt.decode(token)
        const userRoles = decodedToken.realm_access.roles
        await jwt.verify(token, publickey, { algorithms: ['RS256'] }, async (err: any) => {
            if (err) {
                // console.error('Token verification failed:', err)
                return res.sendStatus(400)
            }
            // console.log('Token verified successfully:', decoded.name, decoded.email)
            if (userRoles[0] === role || userRoles[0] === 'Admin') {
                return next()
            }
            return res.sendStatus(403)
        })
    }
}
