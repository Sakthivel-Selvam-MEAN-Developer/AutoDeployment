import { Router } from 'express'
import {
    approveLeaves,
    create,
    listAllLeave,
    listAllLeaveAfterApply,
    rejectLeaves
} from '../controller/employeeLeaves.ts'

const employeeLeavesRoutes = (router: Router) => {
    router.post('/leaves', create)
    router.get('/leaves', listAllLeaveAfterApply)
    router.get('/status', listAllLeave)
    router.post('/reject/:id', rejectLeaves)
    router.post('/approve/:id', approveLeaves)
}

export default employeeLeavesRoutes
