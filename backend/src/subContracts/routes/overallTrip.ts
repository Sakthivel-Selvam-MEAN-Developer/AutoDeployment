import { Router } from 'express'
import {
    listOverallTripWithPaymentStatus,
    listTripDetailsByCompanyName,
    listgetOverallTripById
} from '../controller/overallTrip.ts'

const overallTrip = (router: Router) => {
    router.get('/overalltrip', listOverallTripWithPaymentStatus)
    router.get(
        '/overalltrip/:companyId/:transporterId/:loadingPointId/:from/:to',
        listgetOverallTripById
    )
    router.get('/overalltrip/:company', listTripDetailsByCompanyName)
}

export default overallTrip
