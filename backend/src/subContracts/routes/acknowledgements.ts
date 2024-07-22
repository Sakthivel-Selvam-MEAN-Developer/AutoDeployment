import { Router } from 'express'
import {
    OverAllTripById,
    acknowledgementFileUpload,
    closeTripById,
    listAllActivetripTripByTripStatus,
    listAllTripToByAcknowledgementStatus,
    updateAcknowledgementStatusforOverAllTrip
} from '../controller/acknowledgement.ts'
import { authorise } from './authorise.ts'
import { upload } from '../controller/acknowledgementUpload.ts'

const acknowledgementRoutes = (router: Router) => {
    router.put('/acknowledgement/trip', authorise(['Admin']), closeTripById)
    router.put('/acknowledge/:id', authorise(['Admin']), updateAcknowledgementStatusforOverAllTrip)
    router.get('/acknowledgement/tripstatus', listAllActivetripTripByTripStatus)
    router.get('/acknowledgement/acknowlegementstatus', listAllTripToByAcknowledgementStatus)
    router.get('/acknowledgement/:id', OverAllTripById)
    router.post('/acknowledgement/uploadAcknowledgementFile', upload, acknowledgementFileUpload)
}

export default acknowledgementRoutes
