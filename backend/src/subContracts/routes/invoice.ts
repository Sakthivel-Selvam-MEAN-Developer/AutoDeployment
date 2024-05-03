import { Router } from 'express'
import {
    getInvoiceDetails,
    listTripDetailsByCompanyName,
    updateInvoiceDetails
} from '../controller/invoice.ts'
import { authorise } from './authorise.ts'

const invoiceRoutes = (router: Router) => {
    router.put('/invoice', authorise(['Admin']), getInvoiceDetails)
    router.get('/invoice', listTripDetailsByCompanyName)
    router.put('/invoice/update', authorise(['Admin']), updateInvoiceDetails)
}

export default invoiceRoutes
