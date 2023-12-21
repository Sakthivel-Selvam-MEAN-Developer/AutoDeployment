import { Router } from 'express'
import { createPaymentDues, listOnlyActiveDues, updatePayment } from '../controller/paymentDues.ts'

const paymentDues = (router: Router) => {
    router.post('/payment-dues', createPaymentDues)
    router.get('/payment-dues/:duedate', listOnlyActiveDues)
    router.put('/payment-dues', updatePayment)
}

export default paymentDues
