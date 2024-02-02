import { Router } from 'express'
import {
    listOverallTrip,
    listTripDetailsByCompanyName,
    listgetOverallTripById
} from '../controller/overallTrip.ts'

const overallTrip = (router: Router) => {
    router.get('/overalltrip', listOverallTrip)
    router.get(
        '/overalltrip/:companyId/:transporterId/:loadingPointId/:from/:to',
        listgetOverallTripById
    )
    router.get('/overalltrip/:company', listTripDetailsByCompanyName)
}

export default overallTrip
