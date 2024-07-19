import { Request, Response } from 'express'
import { create } from '../models/companyAdvisory'

export const createCompanyAdvisory = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
