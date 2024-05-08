import { Router } from 'express'
import { createStockPointToUnloadingPointTrip } from '../controller/stockPointToUnloadingPoint.ts'

const unloadingTripRoutes = (router: Router) => {
    router.post('/unloading-trip/:type', createStockPointToUnloadingPointTrip)
}

export default unloadingTripRoutes
