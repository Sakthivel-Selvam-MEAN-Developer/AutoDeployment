import { Router } from 'express'
import {
    ListTripByVehicleNumber,
    updateBalance,
    createTrip,
    listAllTrip
} from '../controller/trip.ts'

const tripRoutes = (router: Router) => {
    router.get('/trip', listAllTrip)
    router.post('/trip', createTrip)
    router.put('/trip', updateBalance)
    router.get('/trip/:trucknumber', ListTripByVehicleNumber)
}

export default tripRoutes
