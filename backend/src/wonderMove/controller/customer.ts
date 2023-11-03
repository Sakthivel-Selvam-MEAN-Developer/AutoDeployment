import { Request, Response } from 'express'
import {
    create as createInDb,
    getAllCustomerNames,
    fetchCustomerByName as getDetailsFromDb,
    updateCustomerByName as updateInDB
} from '../models/customer.ts'

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(() => res.sendStatus(200))
}

export const update = (req: Request, res: Response) => {
    // todo: check if customer number in param and body matches
    updateInDB(req.params.number, req.body).then(() => res.sendStatus(200))
}

export const listAllNames = (_req: Request, res: Response) => {
    getAllCustomerNames().then((numbers) => res.status(200).json(numbers))
}

export const getDetails = (req: Request, res: Response) => {
    getDetailsFromDb(req.params.number).then((detail) => res.status(200).json(detail))
}
