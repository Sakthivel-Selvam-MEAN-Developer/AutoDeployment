import { Router } from 'express'
import { createCompany, listAllCementCompany } from '../controller/cementCompany.ts'
import { authorise } from './authorise.ts'

const cementCompanyRoutes = (router: Router) => {
    router.post('/cementCompany', authorise(['Admin']), createCompany)
    router.get('/cementCompany', listAllCementCompany)
}

export default cementCompanyRoutes
