import { Router } from 'express'
import {
    listTripByTransporterInvoice,
    updateTransporterInvoiceinTrip
} from '../controller/transporterInvoice.ts'

const transporterInvoiceRoutes = (router: Router) => {
    router.get('/transporterinvoice', listTripByTransporterInvoice)
    router.put('/transporterinvoice', updateTransporterInvoiceinTrip)
}

export default transporterInvoiceRoutes
