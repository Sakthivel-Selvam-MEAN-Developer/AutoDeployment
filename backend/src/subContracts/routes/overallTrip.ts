import { Router } from 'express'
import {
    listOverallTripWithPaymentStatus,
    listTripDetailsByUnloadDate,
    listTripStatusReportDetails,
    listAllDiscrepancyReport,
    listAllInvoiceNumbers,
    listOverAllTripByArrayOfIds
} from '../controller/overallTrip.ts'
import { getOverallTripByToll } from '../controller/tollPlaza.ts'

const overallTrip = (router: Router) => {
    router.get('/overalltrip', listOverallTripWithPaymentStatus)
    router.get('/overalltrip/tripstatusreport', listTripStatusReportDetails)
    router.get('/overalltrip/acknowledgement/:date', listTripDetailsByUnloadDate)
    router.get('/overalltrip/report/discrepancy/:from/:to', listAllDiscrepancyReport)
    router.get('/overalltrip/ids', listOverAllTripByArrayOfIds)
    router.get('/invoiceNumber', listAllInvoiceNumbers)
    router.get('/overalltrip/toll', getOverallTripByToll)
}

export default overallTrip
