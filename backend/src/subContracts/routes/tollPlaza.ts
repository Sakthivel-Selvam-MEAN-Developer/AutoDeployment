import { Router } from 'express'
import { createTollLocation, getTollAmount, updateTollDetails } from '../controller/tollPlaza.ts'

const tollPlazaRoutes = (router: Router) => {
    router.post('/toll', createTollLocation)
    router.put('/toll', updateTollDetails)
    router.get('/toll', getTollAmount)
    router.get('/toll/invoice')
}
export default tollPlazaRoutes
