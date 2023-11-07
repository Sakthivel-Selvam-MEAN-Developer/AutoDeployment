import { Request, Response } from 'express'
import { create as createInDb, getAllEmployeeLeaveForm } from '../models/employeeLeaves.ts'

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(() => res.sendStatus(200))
}

export const listAllEmployeeForm = (_req: Request, res: Response) => {
    getAllEmployeeLeaveForm().then((data) => res.status(200).json(data))
}
