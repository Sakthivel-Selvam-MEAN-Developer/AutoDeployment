import { Router } from 'express'
import { createCompany, listAllCementCompany } from '../controller/cementCompany.ts'
import keycloak from '../../keycloak-config.ts'
import { hasRole } from '../../authorization.ts'

const cementCompanyRoutes = (router: Router) => {
    router.post('/cementCompany', keycloak.protect(), hasRole('SuperAdmin'), createCompany)
    router.get('/cementCompany', listAllCementCompany)
}

export default cementCompanyRoutes
