import { Router } from 'express'
import { createPricePointMarker } from '../controller/pricePointMarker.ts'

const pointMarkerRoutes = (router: Router) => {
    router.post('/point-marker', createPricePointMarker)
}

export default pointMarkerRoutes
