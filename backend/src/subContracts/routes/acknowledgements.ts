import { Router } from 'express'
import {
    OverAllTripById,
    listAllActivetripTripToByAcknowledgementStatus,
    updateAcknowledgementStatusforOverAllTrip
} from '../controller/acknowledgement.ts'

const acknowledgementRoutes = (router: Router) => {
    router.put('/acknowledgement', updateAcknowledgementStatusforOverAllTrip)
    router.get('/acknowledgement', listAllActivetripTripToByAcknowledgementStatus)
    router.get('/acknowledgement/:id', OverAllTripById)
}

export default acknowledgementRoutes
