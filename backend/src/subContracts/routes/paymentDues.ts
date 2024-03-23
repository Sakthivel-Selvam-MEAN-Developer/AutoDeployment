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

const paymentDues = (router: Router) => {
    router.post('/payment-dues', createPaymentDues)
    router.get('/payment-dues/:duedate/:status', listOnlyActiveTransporterDues)
    router.put('/payment-dues', updatePayment)
    router.put('/payment-dues/NEFT', updateNEFTStatus)
    router.get('/payment-dues/:status', listGstDuesGroupByName)
    router.get('/payment-dues/:name/:from/:to', listAllUpcomingTransporterDues)
    router.get('/upcoming-payment-dues/default', listAllUpcomingTransporterDuesByDefault)
    router.get('/completed-payment-dues/:name/:from/:to/:page', listAllCompletedDues)
}

export default paymentDues
