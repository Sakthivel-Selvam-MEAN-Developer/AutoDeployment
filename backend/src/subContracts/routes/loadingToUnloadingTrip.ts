import { Router } from 'express'
import {
    ListTripByVehicleNumber,
    createTrip,
    listAllTrip
} from '../controller/loadingToUnloadingTrip.ts'

const tripRoutes = (router: Router) => {
    router.get('/trip', listAllTrip)
    router.post('/trip', createTrip)
    router.get('/trip/:trucknumber', ListTripByVehicleNumber)
}
export default tripRoutes
