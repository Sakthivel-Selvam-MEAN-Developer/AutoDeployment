import { Router } from 'express'
import { createPricePointMarker } from '../controller/pricePointMarker.ts'
import { authorise } from './authorise.ts'

const pointMarkerRoutes = (router: Router) => {
    router.post('/point-marker', authorise(['Admin']), createPricePointMarker)
}

export default pointMarkerRoutes
