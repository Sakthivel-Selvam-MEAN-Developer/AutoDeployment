import { Router } from 'express'
import {
    listOverallTripWithPaymentStatus,
    listTripDetailsByUnloadDate,
    listTripStatusReportDetails,
    listAllDiscrepancyReport,
    listAllInvoiceNumbers,
    listOverAllTripByArrayOfIds
} from '../controller/overallTrip.ts'

const overallTrip = (router: Router) => {
    router.get('/overalltrip', listOverallTripWithPaymentStatus)
    router.get('/overalltrip/tripstatusreport', listTripStatusReportDetails)
    router.get('/overalltrip/acknowledgement/:date', listTripDetailsByUnloadDate)
    router.get('/overalltrip/report/discrepancy/:from/:to', listAllDiscrepancyReport)
    router.get('/overalltrip/ids', listOverAllTripByArrayOfIds)
    router.get('/invoiceNumber', listAllInvoiceNumbers)
    router.get('/overalltrip/toll')
}

export default overallTrip
