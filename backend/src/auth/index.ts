import sdk from '@ory/client'
import config from '../config.ts'
import { NextFunction, Request, Response } from 'express'

const ory = new sdk.FrontendApi(
    new sdk.Configuration({
        basePath: config.ORY_SDK_URL
    })
)

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    ory.toSession({ cookie: req.header('cookie') })
        .then(({ data: session }) => {
            res.locals.id = session.identity
            next()
        })
        .catch(() => {
            // If logged out, send to login page
            res.redirect('/.ory/ui/login')
        })
}
