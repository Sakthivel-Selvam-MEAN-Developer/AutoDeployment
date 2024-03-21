import { NextFunction, Response, Request } from 'express'

const justNext = () => (_req: Request, _res: Response, next: NextFunction) => {
    next()
}

export default justNext
