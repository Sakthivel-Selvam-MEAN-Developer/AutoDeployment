import { Router } from 'express'
import { getInvoiceDetails, updateInvoiceDetails } from '../controller/invoice.ts'
import { authorise } from './authorise.ts'

const invoiceRoutes = (router: Router) => {
    router.put('/invoice', authorise(['Employee']), getInvoiceDetails)
    router.put('/invoice/update', authorise(['Employee']), updateInvoiceDetails)
}

export default invoiceRoutes
