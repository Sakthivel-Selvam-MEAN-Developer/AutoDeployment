import { Router } from 'express'
import {
    ListTripByVehicleNumber,
    updateBalance,
    createTrip,
    listAllTrip,
    listOnlyActiveTrip
} from '../controller/loadingToUnloadingTrip.ts'

const tripRoutes = (router: Router) => {
    router.get('/trip', listAllTrip)
    router.get('/trip/active', listOnlyActiveTrip)
    router.post('/trip', createTrip)
    router.put('/trip', updateBalance)
    router.get('/trip/:trucknumber', ListTripByVehicleNumber)
}

export default tripRoutes
