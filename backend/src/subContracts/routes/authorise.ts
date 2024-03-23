import { NextFunction, Request, Response } from 'express'
import { Role } from '../roles.ts'
import logger from '../../logger.ts'

export const authorise = (roles: Role[] = []) => {
    logger.info('role', roles)
    return (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}
