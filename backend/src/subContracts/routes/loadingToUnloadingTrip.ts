import { Router } from 'express'
import {
    ListTripByVehicleNumber,
    createTrip,
    listAllTrip,
    listAllUnloadingPointUnbilledTrips
} from '../controller/loadingToUnloadingTrip.ts'

const tripRoutes = (router: Router) => {
    router.get('/trip', listAllTrip)
    router.post('/trip', createTrip)
    router.get('/trip/:trucknumber', ListTripByVehicleNumber)
    router.get('/unloading-point-unbilled-trips', listAllUnloadingPointUnbilledTrips)
}
export default tripRoutes
