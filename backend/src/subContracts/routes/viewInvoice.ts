import { Router } from 'express'
import {
    getInvocieNameList,
    getInvoicedToAddAdvisoryDetails,
    getInvoicedTrip
} from '../controller/viewInvoice.ts'

const viewInvoiceRoutes = (router: Router) => {
    router.get('/invoice/viewInvoice', getInvoicedTrip)
    router.get('/invoice/list', getInvocieNameList)
    router.get('/invoice/advisory/add', getInvoicedToAddAdvisoryDetails)
}

export default viewInvoiceRoutes
