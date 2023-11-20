import { Request, Response } from 'express'
import {
    approvedLeaves,
    create as createInDb,
    getAllLeave,
    rejectedLeaves
} from '../models/leaves.ts'

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(() => res.sendStatus(200))
}

// export const listAllLeaveBeforeApproval = (_req: Request, res: Response) => {
//     leavesBeforeApproval().then((data) => res.status(200).json(data))
// }

export const listAllLeave = (req: Request, res: Response) => {
    getAllLeave(req.params.employeeId).then((data) => res.status(200).json(data))
}

export const rejectLeaves = (req: Request, res: Response) => {
    rejectedLeaves(
        parseInt(req.params.id as string, 10),
        req.body.employeeId,
        req.body.deniedComment
    ).then((data: any) => {
        res.status(200).json(data)
    })
}

export const approveLeaves = (req: Request, res: Response) => {
    approvedLeaves(parseInt(req.params.id as string, 10), req.body.employeeId).then((data: any) => {
        res.status(200).json(data)
    })
}
