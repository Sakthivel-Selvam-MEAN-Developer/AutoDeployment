import { Router } from 'express'
import {
    createDriverTrip,
    listAllDriverTripById,
    updateDriverAdvance
} from '../controller/driverTrip.ts'

const driverTripRoutes = (router: Router) => {
    router.post('/drivertrip', createDriverTrip)
    router.get('/drivertrip', listAllDriverTripById)
    router.put('/drivertrip/updateDriverAdvance', updateDriverAdvance)
}

export default driverTripRoutes
