import { Router } from 'express'
import { createEmployee, getAllEmployeeList } from '../controller/employee.ts'
import { authorise } from './authorise.ts'

const employeeSubRoutes = (router: Router) => {
    router.post('/employee', authorise(['Admin']), createEmployee)
    router.get('/getAllEmployee', getAllEmployeeList)
}
export default employeeSubRoutes
