import { Router } from 'express'
import {
    createStockPointTrip,
    listAllStockPointTrip,
    listAllStockPointUnbilledTrips
} from '../controller/loadingToStockPointTrip.ts'

const stockTripRoutes = (router: Router) => {
    router.post('/stock-trip', createStockPointTrip)
    router.get('/stock-trip', listAllStockPointTrip)
    router.get('/stock-point-unbilled-trips', listAllStockPointUnbilledTrips)
}

export default stockTripRoutes
