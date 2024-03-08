import { Router } from 'express'
import { createPricePointMarker } from '../controller/pricePointMarker.ts'
import keycloak from '../../keycloak-config.ts'
import { hasRole } from '../../authorization.ts'

const pointMarkerRoutes = (router: Router) => {
    router.post('/point-marker', keycloak.protect(), hasRole('SuperAdmin'), createPricePointMarker)
}

export default pointMarkerRoutes
