import { Router } from 'express'
import {
    listOverallTripWithPaymentStatus,
    listTripDetailsByCompanyName,
    listTripDetailsByUnloadDate,
    listTripStatusReportDetails,
    listAllDiscrepancyReport
} from '../controller/overallTrip.ts'

const overallTrip = (router: Router) => {
    router.get('/overalltrip', listOverallTripWithPaymentStatus)
    router.get('/overalltrip/tripstatusreport', listTripStatusReportDetails)
    router.get('/overalltrip/:company', listTripDetailsByCompanyName)
    router.get('/overalltrip/acknowledgement/:date', listTripDetailsByUnloadDate)
    router.get('/overalltrip/:company/:startDate/:endDate', listTripDetailsByCompanyName)
    router.get('/overalltrip/report/discrepancy/:from/:to', listAllDiscrepancyReport)
    router.get('/overalltrip/:company/:loadingDate', listTripDetailsByCompanyName)
}

export default overallTrip
