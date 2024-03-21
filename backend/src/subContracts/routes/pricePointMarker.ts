import { Router } from 'express'
import { createPricePointMarker } from '../controller/pricePointMarker.ts'
import { authorise } from './authorise.ts'

const pointMarkerRoutes = (router: Router) => {
    router.post('/point-marker', authorise(['Employee']), createPricePointMarker)
}

export default pointMarkerRoutes
