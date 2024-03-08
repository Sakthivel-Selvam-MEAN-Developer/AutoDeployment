import { Router } from 'express'
import { createPricePoint, listPricePoint } from '../controller/pricePoint.ts'
import keycloak from '../../keycloak-config.ts'
import { hasRole } from '../../authorization.ts'

const pricePointRoutes = (router: Router) => {
    router.post('/price-point', keycloak.protect(), hasRole('SuperAdmin'), createPricePoint)
    router.get('/price-point/:loadingPointId/:unloadingPointId/:stockPointId', listPricePoint)
}

export default pricePointRoutes
