import { Router } from 'express'
import {
    OverAllTripById,
    closeTripById,
    listAllActivetripTripToByAcknowledgementStatus,
    updateAcknowledgementStatusforOverAllTrip
} from '../controller/acknowledgement.ts'

const acknowledgementRoutes = (router: Router) => {
    router.put('/acknowledgement/trip', closeTripById)
    router.put('/acknowledgement/:id', updateAcknowledgementStatusforOverAllTrip)
    router.get('/acknowledgement', listAllActivetripTripToByAcknowledgementStatus)
    router.get('/acknowledgement/:id', OverAllTripById)
}

export default acknowledgementRoutes
