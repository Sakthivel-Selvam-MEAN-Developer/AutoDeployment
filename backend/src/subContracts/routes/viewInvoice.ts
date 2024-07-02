import { Router } from 'express'
import { getInvoicedTrip } from '../controller/viewInvoice.ts'

const viewInvoiceRoutes = (router: Router) => {
    router.get('/invoice/viewInvoice', getInvoicedTrip)
}

export default viewInvoiceRoutes
