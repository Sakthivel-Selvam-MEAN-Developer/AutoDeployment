import { Router } from 'express'
import {
    createPaymentDues,
    donwloadNEFTFile,
    listAllCompletedDues,
    listAllUpcomingTransporterDues,
    listGstDuesGroupByName,
    listOnlyActiveTransporterDues,
    updateNEFTStatus,
    updatePayment
} from '../controller/paymentDues.ts'
import { authorise } from './authorise.ts'

const neftRoute = (router: Router) => {
    router.put('/payment-dues/NEFT', authorise(['Admin']), updateNEFTStatus)
    router.put('/payment-dues/donwloadNEFTFile', authorise(['Admin']), donwloadNEFTFile)
}

const paymentDues = (router: Router) => {
    neftRoute(router)
    router.post('/payment-dues', authorise(['Admin']), createPaymentDues)
    router.get('/payment-dues', listOnlyActiveTransporterDues)
    router.put('/payment-dues', authorise(['Admin']), updatePayment)
    router.get('/payment-dues/:status', listGstDuesGroupByName)
    router.get('/upcoming-payment-dues', listAllUpcomingTransporterDues)
    router.get('/completed-payment-dues/:name/:from/:to/:page', listAllCompletedDues)
}

export default paymentDues
