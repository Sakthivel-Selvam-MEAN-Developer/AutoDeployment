import { Router } from 'express'
import { createDriverTrip, listAllDriverTripById } from '../controller/driverTrip.ts'

const driverTripRoutes = (router: Router) => {
    router.post('/drivertrip', createDriverTrip)
    router.get('/drivertrip', listAllDriverTripById)
}

export default driverTripRoutes
