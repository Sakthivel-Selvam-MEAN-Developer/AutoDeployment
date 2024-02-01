import { Router } from 'express'
import { listOverallTrip, listgetOverallTripById } from '../controller/overallTrip.ts'

const overallTrip = (router: Router) => {
    router.get('/overalltrip', listOverallTrip)
    router.get(
        '/overalltrip/:companyId/:transporterId/:loadingPointId/:from/:to',
        listgetOverallTripById
    )
}

export default overallTrip
