import { Router } from 'express'
import {
    approveLeaves,
    create,
    listAllLeave,
    listAllLeaveBeforeApproval,
    rejectLeaves
} from '../controller/leaves.ts'

const employeeLeavesRoutes = (router: Router) => {
    router.post('/leaves', create)
    router.get('/leaves/', listAllLeaveBeforeApproval)
    router.get('/all-leaves/:employeeId', listAllLeave)
    router.post('/reject/:id', rejectLeaves)
    router.post('/approve/:id', approveLeaves)
}

export default employeeLeavesRoutes
