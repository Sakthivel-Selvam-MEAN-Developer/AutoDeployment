import jwt from 'jsonwebtoken'
import configs from './config.ts'

export function hasRole(role: string[]) {
    return async function (req: any, res: any, next: any) {
        const { publicKey } = configs
        const { token } = req.kauth.grant.access_token
        const publickey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`
        if (token == null) return res.sendStatus(401)
        const decodedToken: any = jwt.decode(token)
        const userRoles = decodedToken.realm_access.roles
        jwt.verify(token, publickey, { algorithms: ['RS256'] }, async (err: any) => {
            if (err) {
                // console.error('Token verification failed:', err)
                return res.sendStatus(400)
            }
            // console.log('Token verified successfully:', decoded.name, decoded.email)
            if (role.includes(userRoles[0]) || userRoles[0] === 'Admin') {
                return next()
            }
            return res.sendStatus(403)
        })
    }
}
