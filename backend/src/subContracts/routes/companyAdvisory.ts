import { Router } from 'express'
import { createCompanyAdvisory } from '../controller/companyAdvisory'

const companyAdvisoryRoutes = (router: Router) => {
    router.post('/companyAdvisory/create', createCompanyAdvisory)
}

export default companyAdvisoryRoutes
