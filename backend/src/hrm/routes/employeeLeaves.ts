import { Router } from 'express'
import {
    approveLeaves,
    create,
    getAllApprovedLeavesByEmployee,
    getAllRejectedLeavesByEmployee,
    listAllEmployeeForm,
    rejectLeaves
} from '../controller/employeeLeaves.ts'

const employeeLeavesRoutes = (router: Router) => {
    router.post('/employee', create)
    router.get('/employee', listAllEmployeeForm)
    router.post('/reject/:id', rejectLeaves)
    router.get('/reject', getAllRejectedLeavesByEmployee)
    router.post('/approve/:id', approveLeaves)
    router.get('/approve', getAllApprovedLeavesByEmployee)
}

export default employeeLeavesRoutes
