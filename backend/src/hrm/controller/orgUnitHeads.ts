import { Request, Response } from 'express'
import { isEmployeeInOrgUnitHeads, orgHeadOfEmployees } from '../models/orgUnitHeads.ts'
import { getHeadLeave, leavesPendingReview } from '../models/leaves.ts'
import { getEmployeeOrgId } from '../models/employee.ts'
import { isEmployeeHeadOfParentOrg } from '../models/orgUnitRelations.ts'

export const employeeLeavesPerOrg = (req: any, res: any) => {
    isEmployeeInOrgUnitHeads(req.params.employeeId)
        .then((result: any) => {
            if (result && result.orgUnitId) {
                return leavesPendingReview(result.orgUnitId)
            }
            return null
        })
        .then((data: any) => {
            res.status(200).json(data)
        })
}

const getOrgHeadLeaveForEachOrg = async (listOfChildId: any[]) => {
    const orgHeadDetails = await Promise.all(
        listOfChildId.map((data) => orgHeadOfEmployees(data.childId))
    )
    const leaves = await Promise.all(
        orgHeadDetails.map(({ employeeId }: any) => getHeadLeave(employeeId))
    )
    return leaves
}

export const childOrgLeavesEachOrg = (req: Request, res: Response) => {
    getEmployeeOrgId(req.params.employeeId)
        .then(({ orgUnitId }: any) => isEmployeeHeadOfParentOrg(orgUnitId))
        .then(getOrgHeadLeaveForEachOrg)
        .then((data: any) => {
            res.status(200).json(data)
        })
}
