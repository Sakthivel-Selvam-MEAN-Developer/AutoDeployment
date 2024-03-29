import { Application, NextFunction, Response, Request } from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import routes from './index.ts'

const healthRoute = (app: Application): void => {
    app.get('/health', (res: Response) => {
        res.status(200).send()
    })
}

const nonExistingRoute = (app: Application): void => {
    app.use((res: Response) => {
        res.status(404).send("Sorry can't find that!!!!")
    })
}
const auditRoute = (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        const token: any = req.headers.authorization?.split(' ')[1]
        const decodedToken: any = jwt.decode(token)
        if (decodedToken === null) {
            return
        }
        const userRoles = decodedToken.realm_access.roles
        const audit = `\n[${new Date().toString()}] ${req.method} ${req.url}, ${
            res.statusCode
        }, ACTION_BY:"${decodedToken.name}", USER_ROLE:"${userRoles[0]}"`
        fs.appendFile('./auditLogs.log', audit, (err) => {
            if (err) {
                console.error('Error writing to file:', err)
                return
            }
            console.log('Data has been written to file successfully.')
        })
    })
    next()
}

const setRoutes = (app: Application): void => {
    healthRoute(app)
    app.use('/api', auditRoute, routes)
    nonExistingRoute(app)
}

export default setRoutes
