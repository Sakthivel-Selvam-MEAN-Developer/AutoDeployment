import { Router } from 'express'
import {
    OverAllTripById,
    acknowledgementFileGet,
    acknowledgementFileUpload,
    closeTripById,
    getAcknowledgementFileByOverallTripId,
    getCementCompanyName,
    listAllActivetripTripByTripStatus,
    listAllTripToByAcknowledgementStatus,
    updateAcknowledgementStatusforOverAllTrip
} from '../controller/acknowledgement.ts'
import { authorise } from './authorise.ts'
import { upload } from '../controller/acknowledgementUpload.ts'
const acknowledgementRoutesHelper = (router: Router) => {
    router.get('/getCompanyNameByOverallTripId', getCementCompanyName)
    router.get('/getAcknowledgementFile', acknowledgementFileGet)
    router.get('/getAcknowledgementFileByOverallTripId', getAcknowledgementFileByOverallTripId)
}
const acknowledgementRoutes = (router: Router) => {
    router.put('/acknowledgement/trip', authorise(['Admin']), closeTripById)
    router.put('/acknowledge/:id', authorise(['Admin']), updateAcknowledgementStatusforOverAllTrip)
    router.get('/acknowledgement/tripstatus', listAllActivetripTripByTripStatus)
    router.get('/acknowledgement/acknowlegementstatus', listAllTripToByAcknowledgementStatus)
    router.get('/acknowledgement/:id', OverAllTripById)
    router.post('/acknowledgement/uploadAcknowledgementFile', upload, acknowledgementFileUpload)
    acknowledgementRoutesHelper(router)
}
export default acknowledgementRoutes
