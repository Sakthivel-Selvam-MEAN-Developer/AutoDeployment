import { Router } from 'express'
import {
    OverAllTripById,
    closeTripById,
    listAllActivetripTripToByAcknowledgementStatus,
    updateAcknowledgementStatusforOverAllTrip
} from '../controller/acknowledgement.ts'

const acknowledgementRoutes = (router: Router) => {
    router.get('/acknowledgement', listAllActivetripTripToByAcknowledgementStatus)
    router.get('/acknowledgement/:id', OverAllTripById)
    router.put('/acknowledgement/trip', closeTripById)
    router.put('/acknowledgement', updateAcknowledgementStatusforOverAllTrip)
}

export default acknowledgementRoutes
