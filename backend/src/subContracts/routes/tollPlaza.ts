import { Router } from 'express'
import {
    createTollLocation,
    getOverallTripByTollNotEmpty,
    getTollAmount,
    updateTollDetails
} from '../controller/tollPlaza.ts'

const tollPlazaRoutes = (router: Router) => {
    router.post('/toll', createTollLocation)
    router.put('/toll', updateTollDetails)
    router.get('/toll', getTollAmount)
    router.get('/toll/invoice', getOverallTripByTollNotEmpty)
}
export default tollPlazaRoutes
