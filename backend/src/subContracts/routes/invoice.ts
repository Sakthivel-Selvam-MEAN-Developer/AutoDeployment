import { Router } from 'express'
import { getInvoiceDetails, updateInvoiceDetails } from '../controller/invoice.ts'

const invoiceRoutes = (router: Router) => {
    router.put('/invoice/', getInvoiceDetails)
    router.put('/invoice/update', updateInvoiceDetails)
}

export default invoiceRoutes
