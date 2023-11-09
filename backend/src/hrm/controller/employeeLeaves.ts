import { Request, Response } from 'express'
import {
    approvedLeaves,
    create as createInDb,
    getAllLeave,
    leavesAfterApply,
    rejectedLeaves
} from '../models/employeeLeaves.ts'

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(() => res.sendStatus(200))
}

export const listAllLeaveAfterApply = (_req: Request, res: Response) => {
    leavesAfterApply().then((data) => res.status(200).json(data))
}

export const listAllLeave = (_req: Request, res: Response) => {
    getAllLeave().then((data) => res.status(200).json(data))
}

export const rejectLeaves = (req: Request, res: Response) => {
    rejectedLeaves(parseInt(req.params.id as string, 10), req.body.appliedBy).then((data: any) => {
        res.status(200).json(data)
    })
}

export const approveLeaves = (req: Request, res: Response) => {
    approvedLeaves(parseInt(req.params.id as string, 10), req.body.appliedBy).then((data: any) => {
        res.status(200).json(data)
    })
}
