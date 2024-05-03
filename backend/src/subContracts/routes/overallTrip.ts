import { Router } from 'express'
import {
    listOverallTripWithPaymentStatus,
    listTripDetailsByUnloadDate,
    listTripStatusReportDetails,
    listAllDiscrepancyReport
} from '../controller/overallTrip.ts'

const overallTrip = (router: Router) => {
    router.get('/overalltrip', listOverallTripWithPaymentStatus)
    router.get('/overalltrip/tripstatusreport', listTripStatusReportDetails)
    router.get('/overalltrip/acknowledgement/:date', listTripDetailsByUnloadDate)
    router.get('/overalltrip/report/discrepancy/:from/:to', listAllDiscrepancyReport)
}

export default overallTrip
