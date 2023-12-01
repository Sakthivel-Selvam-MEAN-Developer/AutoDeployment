import { Router } from 'express'
import { getEmployeeDetails } from '../controller/employees.ts'

const employeeRoutes = (router: Router) => {
    router.get('/employees/:employeeId', getEmployeeDetails)
}

export default employeeRoutes
