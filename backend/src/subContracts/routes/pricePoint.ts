import { Router } from 'express'
import { createPricePoint, listPricePoint } from '../controller/pricePoint.ts'

const pricePointRoutes = (router: Router) => {
    router.post('/price-point', createPricePoint)
    router.get('/price-point/:loadingPointId/:unloadingPointId/:stockPointId', listPricePoint)
}

export default pricePointRoutes
