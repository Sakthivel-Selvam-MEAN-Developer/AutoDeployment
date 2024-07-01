import { Router } from 'express'
import { listTripDetailsByCompanyName } from '../controller/invoice.ts'

const viewInvoiceRoutes = (router: Router) => {
    router.get('/invoice', listTripDetailsByCompanyName)
}

export default viewInvoiceRoutes
