import { Request, Response } from 'express'
import { create, getCompanyAdvisorys } from '../models/companyAdvisory'

export const createCompanyAdvisory = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}

export const getCompanyAdvisory = (_req: Request, res: Response) => {
    getCompanyAdvisorys()
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
