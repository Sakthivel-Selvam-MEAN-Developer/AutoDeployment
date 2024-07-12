import { Router } from 'express'
import { createEmployee } from '../controller/employee.ts'
import { authorise } from './authorise.ts'

const employeeSubRoutes = (router: Router) => {
    router.post('/employee', authorise(['Admin']), createEmployee)
}
export default employeeSubRoutes
