import { Router } from 'express'
import { createCompany, listAllCementCompany } from '../controller/cementCompany.ts'
import { authorise } from './authorise.ts'

const cementCompanyRoutes = (router: Router) => {
    router.post('/cementCompany', authorise(['Employee']), createCompany)
    router.get('/cementCompany', listAllCementCompany)
}

export default cementCompanyRoutes
