import { Router } from 'express'
import {
    createStockPointToUnloadingPointTrip,
    listAllStocktoUnloadingPointUnbilledTrips
} from '../controller/stockPointToUnloadingPoint.ts'

const unloadingTripRoutes = (router: Router) => {
    router.post('/unloading-trip', createStockPointToUnloadingPointTrip)
    router.get('/stock-to-unloading-unbilled-trips', listAllStocktoUnloadingPointUnbilledTrips)
}

export default unloadingTripRoutes
