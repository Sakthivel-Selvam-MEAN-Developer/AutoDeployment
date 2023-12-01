import { Router } from 'express'
import { createTrip, listAllTrip } from '../controller/trip.ts'

const tripRoutes = (router: Router) => {
    router.get('/trip', listAllTrip)
    router.post('/trip', createTrip)
}

export default tripRoutes
