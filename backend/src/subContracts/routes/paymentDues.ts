import { Router } from 'express'
import {
    createPaymentDues,
    listAllCompletedDues,
    listAllUpcomingTransporterDues,
    listAllUpcomingTransporterDuesByDefault,
    listGstDuesGroupByName,
    listOnlyActiveTransporterDues,
    updateNEFTStatus,
    updatePayment
} from '../controller/paymentDues.ts'
import { authorise } from './authorise.ts'

const paymentDues = (router: Router) => {
    router.post('/payment-dues', authorise(['Admin']), createPaymentDues)
    router.get('/payment-dues', listOnlyActiveTransporterDues)
    router.put('/payment-dues', authorise(['Admin']), updatePayment)
    router.put('/payment-dues/NEFT', authorise(['Admin']), updateNEFTStatus)
    router.get('/payment-dues/:status', listGstDuesGroupByName)
    router.get('/payment-dues/:name/:from/:to', listAllUpcomingTransporterDues)
    router.get('/upcoming-payment-dues/default', listAllUpcomingTransporterDuesByDefault)
    router.get('/completed-payment-dues/:name/:from/:to/:page', listAllCompletedDues)
}

export default paymentDues
