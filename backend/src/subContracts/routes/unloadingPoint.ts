import { Router } from 'express'
import {
    createUnloadingPoint,
    listAllUnloadingPoint,
    listUnloadingPonitBycementCompany
} from '../controller/unloadingPoint.ts'
import keycloak from '../../keycloak-config.ts'
import { hasRole } from '../../authorization.ts'

const deliveryPointRoutes = (router: Router) => {
    router.post('/unloading-point', keycloak.protect(), hasRole('SuperAdmin'), createUnloadingPoint)
    router.get('/unloading/:cementCompanyId', listAllUnloadingPoint)
    router.get('/unloading-point/:companyName', listUnloadingPonitBycementCompany)
}

export default deliveryPointRoutes
