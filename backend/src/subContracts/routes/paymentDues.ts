import { Router } from 'express'
import {
    createPaymentDues,
    listOnlyActiveTransporterDues,
    updatePayment
} from '../controller/paymentDues.ts'

const paymentDues = (router: Router) => {
    router.post('/payment-dues', createPaymentDues)
    router.get('/payment-dues/:duedate/:type', listOnlyActiveTransporterDues)
    router.put('/payment-dues', updatePayment)
}

export default paymentDues
