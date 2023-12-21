import { Router } from 'express'
import { createPaymentDues, listOnlyActiveDues } from '../controller/paymentDues.ts'

const paymentDues = (router: Router) => {
    router.get('/payment-dues', listOnlyActiveDues)
    router.post('/payment-dues', createPaymentDues)
}

export default paymentDues
