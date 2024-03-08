import { Router } from 'express'
import {
    OverAllTripById,
    closeTripById,
    listAllActivetripTripToByAcknowledgementStatus,
    updateAcknowledgementStatusforOverAllTrip
} from '../controller/acknowledgement.ts'
import keycloak from '../../keycloak-config.ts'
import { hasRole } from '../../authorization.ts'

const acknowledgementRoutes = (router: Router) => {
    router.put('/acknowledgement/trip', keycloak.protect(), hasRole('SuperAdmin'), closeTripById)
    router.put(
        '/acknowledge/:id',
        keycloak.protect(),
        hasRole('SuperAdmin'),
        updateAcknowledgementStatusforOverAllTrip
    )
    router.get('/acknowledgement', listAllActivetripTripToByAcknowledgementStatus)
    router.get('/acknowledgement/:id', OverAllTripById)
}

export default acknowledgementRoutes
