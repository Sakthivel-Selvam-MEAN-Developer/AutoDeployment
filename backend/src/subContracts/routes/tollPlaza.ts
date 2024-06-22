import { Router } from 'express'
import {
    createTollLocation,
    getOverallTripByTollNotEmpty,
    getOverallTripByToll,
    updateTollDetails,
    getTollLocation
} from '../controller/tollPlaza.ts'

const tollPlazaRoutes = (router: Router) => {
    router.post('/toll', createTollLocation)
    router.put('/toll/update/billDetails', updateTollDetails)
    router.get('/toll', getOverallTripByToll)
    router.get('/toll/invoice', getOverallTripByTollNotEmpty)
    router.get('/toll/locations/state', getTollLocation)
}
export default tollPlazaRoutes
