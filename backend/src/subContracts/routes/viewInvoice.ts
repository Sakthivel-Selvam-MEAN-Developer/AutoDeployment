import { Router } from 'express'
import {
    getInvoicedToAddAdvisoryDetails,
    getInvoicedTrip,
    updateShortageDetails
} from '../controller/viewInvoice.ts'
import { authorise } from './authorise.ts'

const viewInvoiceRoutes = (router: Router) => {
    router.get('/invoice/viewInvoice', getInvoicedTrip)
    router.get('/invoice/advisory/add', getInvoicedToAddAdvisoryDetails)
    router.put('/invoice/shortage/update', authorise(['Admin']), updateShortageDetails)
    router.put('/invoice/gstReceived', authorise(['Admin']))
}

export default viewInvoiceRoutes
