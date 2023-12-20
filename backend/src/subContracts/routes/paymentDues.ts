import { Router } from 'express'
import {
    createPaymentDues,
    listOnlyActiveDues,
    listTripWithActiveDues
} from '../controller/paymentDues.ts'

const paymentDues = (router: Router) => {
    router.post('/payment-dues', createPaymentDues)
    router.get('/payment-dues', listOnlyActiveDues)
    router.get('/payment-dues/:name', listTripWithActiveDues)
}

export default paymentDues
