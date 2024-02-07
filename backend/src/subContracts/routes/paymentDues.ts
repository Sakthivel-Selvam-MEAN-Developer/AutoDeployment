import { Router } from 'express'
import {
    createPaymentDues,
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
    router.get('/payment-dues/gst', listGstDuesGroupByName)
}

export default paymentDues
