import { Router } from 'express'
import { getInvocieNameList, getInvoicedTrip } from '../controller/viewInvoice.ts'

const viewInvoiceRoutes = (router: Router) => {
    router.get('/invoice/viewInvoice', getInvoicedTrip)
    router.get('/invoice/list', getInvocieNameList)
}

export default viewInvoiceRoutes
