import { Router } from 'express'
import { createStockPointToUnloadingPointTrip } from '../controller/stockPointToUnloadingPoint.ts'

const unloadingTripRoutes = (router: Router) => {
    router.post('/unloading-trip', createStockPointToUnloadingPointTrip)
}

export default unloadingTripRoutes
