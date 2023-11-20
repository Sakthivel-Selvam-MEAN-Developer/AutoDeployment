import { Request, Response } from 'express'
import { isEmployeeInOrgUnitHeads } from '../models/orgUnitHeads.ts'
import { leavesBeforeApproval } from '../models/leaves.ts'

export const employeeLeavesPerOrg = (req: Request, res: Response) => {
    isEmployeeInOrgUnitHeads(req.params.employeeId)
        .then(({ orgUnitsId }: any) => leavesBeforeApproval(orgUnitsId))
        .then((data: any) => {
            res.status(200).json(data)
        })
}
