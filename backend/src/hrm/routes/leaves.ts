import { Router } from 'express'
import { approveLeaves, create, listAllLeave, rejectLeaves } from '../controller/leaves.ts'

const employeeLeavesRoutes = (router: Router) => {
    router.post('/leaves', create)
    router.get('/all-leaves/:employeeId', listAllLeave)
    router.post('/reject/:id', rejectLeaves)
    router.post('/approve/:id', approveLeaves)
}

export default employeeLeavesRoutes
