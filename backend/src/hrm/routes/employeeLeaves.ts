import { Router } from 'express'
import { create, getAllRejectedLeavesByEmployee, listAllEmployeeForm, rejectLeaves } from '../controller/employeeLeaves.ts'

const employeeLeavesRoutes = (router: Router) => {
    router.post('/employee', create)
    router.get('/employee', listAllEmployeeForm)
    router.post('/reject/:id', rejectLeaves)
    router.get('/reject', getAllRejectedLeavesByEmployee)
}

export default employeeLeavesRoutes
