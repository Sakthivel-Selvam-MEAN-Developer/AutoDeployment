import { Router } from 'express'
import {
    OverAllTripById,
    closeTripById,
    listAllActivetripTripByTripStatus,
    listAllTripToByAcknowledgementStatus,
    updateAcknowledgementStatusforOverAllTrip
} from '../controller/acknowledgement.ts'
import { authorise } from './authorise.ts'

const acknowledgementRoutes = (router: Router) => {
    router.put('/acknowledgement/trip', authorise(['Admin']), closeTripById)
    router.put('/acknowledge/:id', authorise(['Admin']), updateAcknowledgementStatusforOverAllTrip)
    router.get('/acknowledgement/tripstatus', listAllActivetripTripByTripStatus)
    router.get('/acknowledgement/acknowlegementstatus', listAllTripToByAcknowledgementStatus)
    router.get('/acknowledgement/:id', OverAllTripById)
}

export default acknowledgementRoutes
