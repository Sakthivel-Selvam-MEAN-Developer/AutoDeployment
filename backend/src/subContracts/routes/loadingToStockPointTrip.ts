import { Router } from 'express'
import {
    createStockPointTrip,
    listAllStockPointTrip
} from '../controller/loadingToStockPointTrip.ts'

const stockTripRoutes = (router: Router) => {
    router.post('/stock-trip', createStockPointTrip)
    router.get('/stock-trip', listAllStockPointTrip)
}

export default stockTripRoutes
