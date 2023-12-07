import { Router } from 'express'
import { createCompany, listAllCementCompany } from '../controller/cementCompany.ts'

const cementCompanyRoutes = (router: Router) => {
    router.post('/cementCompany', createCompany)
    router.get('/cementCompany', listAllCementCompany)
}

export default cementCompanyRoutes
