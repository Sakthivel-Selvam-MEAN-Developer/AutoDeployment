import { Router } from 'express'
import { create, listAllEmployeeForm } from '../controller/employeeLeaves.ts'

const employeeLeavesRoutes = (router: Router) => {
    router.post('/employee', create)
    router.get('/employee', listAllEmployeeForm)
}

export default employeeLeavesRoutes
