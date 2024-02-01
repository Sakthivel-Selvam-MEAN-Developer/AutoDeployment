import { Router } from 'express'
import { listOverallTrip, listgetOverallTripById } from '../controller/overallTrip.ts'

const overallTrip = (router: Router) => {
    router.get('/overalltrip', listOverallTrip)
    router.get('/overalltrip/:companyId/:transporterId/:loadingPointId', listgetOverallTripById)
}

export default overallTrip
