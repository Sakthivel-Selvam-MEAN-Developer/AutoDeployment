import { Request, Response } from 'express'
import { create as createInDb, getAllEmployeeLeaveForm, getAllRejectedLeaves, rejectedLeaves } from '../models/employeeLeaves.ts'

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(() => res.sendStatus(200))
}

export const listAllEmployeeForm = (_req: Request, res: Response) => {
    getAllEmployeeLeaveForm().then((data) => res.status(200).json(data))
}

export const rejectLeaves = (req: Request, res: Response) => {
    rejectedLeaves(parseInt(req.params.id as string, 10), req.body.appliedBy).then((data: any) => {
        res.status(200).json(data)
    })
}

export const getAllRejectedLeavesByEmployee = (req: Request, res: Response) => {
    getAllRejectedLeaves(req.body.appliedBy).then((detail) => res.status(200).json(detail))
}