import { Router } from 'express'
import {
    listOverallTripWithPaymentStatus,
    listTripDetailsByCompanyName,
    listTripDetailsByUnloadDate,
    listgetOverallTripById,
    listAllDiscrepancyReport
} from '../controller/overallTrip.ts'

const overallTrip = (router: Router) => {
    router.get('/overalltrip', listOverallTripWithPaymentStatus)
    router.get(
        '/overalltrip/:companyId/:transporterId/:loadingPointId/:from/:to',
        listgetOverallTripById
    )
    router.get('/overalltrip/:company', listTripDetailsByCompanyName)
    router.get('/overalltrip/acknowledgement/:date', listTripDetailsByUnloadDate)
    router.get('/overalltrip/:company/:loadingDate', listTripDetailsByCompanyName)
    router.get('/overalltrip/report/:from/:to', listAllDiscrepancyReport)
    router.get('/overalltrip/:company/:loadingDate', listTripDetailsByCompanyName)
}

export default overallTrip
