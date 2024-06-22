import { Router } from 'express'
import {
    createTollLocation,
    getOverallTripByTollNotEmpty,
    getOverallTripByToll,
    updateTollDetails,
    updateTollAmountDetails,
    getTollLocation
} from '../controller/tollPlaza.ts'

const tollPlazaRoutes = (router: Router) => {
    router.post('/toll', createTollLocation)
    router.put('/toll/update/billDetails', updateTollDetails)
    router.put('/toll/update/amount', updateTollAmountDetails)
    router.get('/toll', getOverallTripByToll)
    router.get('/toll/invoice', getOverallTripByTollNotEmpty)
    router.get('/toll/locations/state', getTollLocation)
}
export default tollPlazaRoutes
