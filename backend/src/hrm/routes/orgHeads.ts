import { Router } from 'express'
import { employeeLeavesPerOrg } from '../controller/orgUnitHeads.ts'

const orgHeadRoutes = (router: Router) => {
    router.get('/org-leaves/:employeeId', employeeLeavesPerOrg)
}

export default orgHeadRoutes
