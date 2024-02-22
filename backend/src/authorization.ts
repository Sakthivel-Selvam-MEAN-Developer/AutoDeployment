import { Router } from 'express'
// @ts-expect-error module missing
import jwt from 'jsonwebtoken'
import configs from './config.ts'

const authorization = (router: Router) => {
    router.get('/auth', (req, res) => {
        const { PUBLIC_KEY } = configs
        const bearerHeader = req.headers.authorization
        const token = bearerHeader?.split(' ')[1]
        const publickey = `-----BEGIN PUBLIC KEY-----\n${PUBLIC_KEY}\n-----END PUBLIC KEY-----`
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, publickey, { algorithms: ['RS256'] }, (err: any) => {
            if (err) {
                // console.error('Token verification failed:', err)
            }
            // console.log('Token verified successfully:', decoded.name, decoded.email)
        })
        res.sendStatus(200)
    })
}

export default authorization
