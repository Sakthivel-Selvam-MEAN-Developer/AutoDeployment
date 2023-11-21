// import { Request, Response } from 'express'
import { isEmployeeInOrgUnitHeads } from '../models/orgUnitHeads.ts'
import { leavesPendingReview } from '../models/leaves.ts'

export const employeeLeavesPerOrg = (req: any, res: any) => {
    isEmployeeInOrgUnitHeads(req.params.employeeId)
        .then((result: any) => {
            if (result && result.orgUnitsId) {
                return leavesPendingReview(result.orgUnitsId)
            }
            return null
        })
        .then((data: any) => {
            res.status(200).json(data)
        })
}
