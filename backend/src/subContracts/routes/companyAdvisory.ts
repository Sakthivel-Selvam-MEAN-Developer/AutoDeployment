import { Router } from 'express'
import { createCompanyAdvisory, getCompanyAdvisory } from '../controller/companyAdvisory'

const companyAdvisoryRoutes = (router: Router) => {
    router.post('/companyAdvisory/create', createCompanyAdvisory)
    router.get('/companyAdvisory/get', getCompanyAdvisory)
}

export default companyAdvisoryRoutes
