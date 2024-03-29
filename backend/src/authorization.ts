import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'

export function hasRole(role: string[]) {
    return async function (req: any, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (token === undefined) return res.sendStatus(401)
            const decodedToken: any = jwt.decode(token)
            if (decodedToken === null) return res.sendStatus(401)
            const userRoles = decodedToken.realm_access.roles
            console.log('Token verified successfully:', userRoles[0])
            if (role.includes(userRoles[0]) || userRoles[0] === 'Admin') return next()
            return res.status(403).send({ error: 'User not allowed to perform action' })
        } catch (e) {
            return res.status(403).send('Token does not exist')
        }
    }
}
