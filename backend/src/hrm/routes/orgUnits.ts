import { Router } from 'express'
import { childOrgLeavesEachOrg } from '../controller/orgUnitHeads.ts'

const orgUnitHeads = (router: Router) => {
    router.get('/org-head-leaves/:employeeId', childOrgLeavesEachOrg)
}

export default orgUnitHeads
