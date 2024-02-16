import { Router } from 'express'
import { getInvoiceDetails } from '../controller/invoice.ts'

const invoiceRoutes = (router: Router) => {
    router.put('/invoice/', getInvoiceDetails)
}

export default invoiceRoutes
