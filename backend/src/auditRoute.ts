import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { create } from './subContracts/models/auditLogs.ts'
import logger from './logger.ts'

export const auditRoute = async (req: any, res: any, next: NextFunction) => {
    if (req.method !== 'GET') {
        let resDetails: { id: number } | undefined

        const prevJSON = res.json
        const originalEnd = res.end

        res.json = (data: any) => {
            resDetails = data
            prevJSON.call(res, data)
        }

        res.end = async (...args: any[]) => {
            const token: any = req.headers.authorization?.split(' ')[1]
            const decodedToken: any = jwt.decode(token)
            if (decodedToken === null) return
            const userRoles = decodedToken.realm_access.roles
            const auditLog = {
                url: `${req.baseUrl}${req.url}`,
                method: req.method,
                payload: req.body,
                status: res.statusCode,
                actionBy: decodedToken.name,
                userRole: userRoles[0],
                actionStartTime: new Date(),
                actionEndTime: new Date(),
                entityName: req.url.split('/')[1],
                entityID: resDetails ? resDetails.id : 0
            }
            await create(auditLog).then(() => logger.info('Audit Log Stored'))
            originalEnd.apply(res, args)
        }
    }
    next()
}
