import { Router } from 'express'
import {
    listTripDetailsByCompanyName,
    updateBillingRate,
    previewPDFController,
    updateInvoiceDetails
} from '../controller/invoice.ts'
import { authorise } from './authorise.ts'

const invoiceRoutes = (router: Router) => {
    router.get('/invoice', listTripDetailsByCompanyName)
    router.put('/invoice/update', authorise(['Admin']), updateInvoiceDetails)
    router.put('/invoice/billingrate', updateBillingRate)
    router.post('/invoice/previewPDF', authorise(['Admin']), previewPDFController)
}

export default invoiceRoutes
