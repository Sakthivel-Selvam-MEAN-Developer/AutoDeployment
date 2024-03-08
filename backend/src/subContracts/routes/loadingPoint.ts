import { Router } from 'express'
import {
    createLoadingPoint,
    listAllLoadingPoint,
    listLoadingPointByCementCompany
} from '../controller/loadingPoint.ts'
import keycloak from '../../keycloak-config.ts'
import { hasRole } from '../../authorization.ts'

const factoryRoutes = (router: Router) => {
    router.post('/loading-point', keycloak.protect(), hasRole('SuperAdmin'), createLoadingPoint)
    router.get('/loading-point', listAllLoadingPoint)
    router.get('/loading-point/:companyName', listLoadingPointByCementCompany)
}

export default factoryRoutes
