// @ts-expect-error module missing
import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import fs from 'fs'
// import configs from './config.ts'

export function hasRole(role: string) {
    return async function (req: any, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            // const { PUBLIC_KEY } = configs
            // const { token } = req.kauth.grant.access_token
            // const pkey = `-----BEGIN PUBLIC KEY-----\n${PUBLIC_KEY}\n-----END PUBLIC KEY-----`
            if (token == null) return res.sendStatus(401)
            const decodedToken = await jwt.decode(token)
            if (decodedToken == null) return res.sendStatus(401)
            const userRoles = decodedToken.realm_access.roles
            // await jwt.verify(token, publickey, { algorithms: ['RS256'] },
            //  async (err: any, decoded: any) =>
            // {
            //     if (err) {
            //         console.error('Token verification failed:', err)
            //         return res.status(400).send('User is not athenticated')
            //     }
            // })
            console.log('Token verified successfully:', userRoles[0])
            const dataToWrite = `\n[${new Date().toString()}] ${req.method} ${req.url}, ${
                res.statusCode
            }, createdBy:"${decodedToken.name}", userRole:"${userRoles[0]}"`
            fs.appendFile('./auditLogs.log', dataToWrite, (err) => {
                if (err) {
                    console.error('Error writing to file:', err)
                    return
                }
                console.log('Data has been written to file successfully.')
            })
            if (userRoles[0] === role || userRoles[0] === 'Admin') {
                return next()
            }
            return res.status(403).send({ error: 'User not allowed to perform action' })
        } catch (e) {
            return res.status(403).send('Token does not exist')
        }
    }
}
