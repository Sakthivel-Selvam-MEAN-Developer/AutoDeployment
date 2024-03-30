import { Router } from 'express'
import { createPricePoint, listPricePoint } from '../controller/pricePoint.ts'
import { authorise } from './authorise.ts'

const pricePointRoutes = (router: Router) => {
    router.post('/price-point', authorise(['Admin']), createPricePoint)
    router.get('/price-point/:loadingPointId/:unloadingPointId/:stockPointId', listPricePoint)
}

export default pricePointRoutes
