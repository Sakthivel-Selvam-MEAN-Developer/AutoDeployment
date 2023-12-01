import { Router } from 'express'
import { listAllCementCompany } from '../controller/cementCompany.ts'

const cementCompanyRoutes = (router: Router) => {
    router.get('/cementCompany', listAllCementCompany)
}

export default cementCompanyRoutes
