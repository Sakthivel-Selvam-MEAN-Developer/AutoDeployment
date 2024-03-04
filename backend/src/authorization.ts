import { Router } from 'express'
// import prisma from '../prisma/index.ts'
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
        jwt.verify(
            token,
            publickey,
            { algorithms: ['RS256'] },
            async (err: any, decoded: { name: string; email: string }) => {
                if (err) {
                    console.error('Token verification failed:', err)
                }
                console.log('Token verified successfully:', decoded.name, decoded.email)
            }
        )
        res.status(200).json('')
    })
}

export default authorization
