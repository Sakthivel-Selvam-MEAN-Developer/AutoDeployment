import { Router } from 'express'
import {
    listTripDetailsByCompanyName,
    updateBillingRate,
    // previewPDFController,
    updateInvoiceDetails
} from '../controller/invoice.ts'
import { authorise } from './authorise.ts'

const invoiceRoutes = (router: Router) => {
    router.get('/invoice', listTripDetailsByCompanyName)
    router.put('/invoice/update', authorise(['Admin']), updateInvoiceDetails)
    router.post('/invoice/previewPDF', authorise(['Admin']))
    router.put('/invoice/billingrate', updateBillingRate)
}

export default invoiceRoutes
