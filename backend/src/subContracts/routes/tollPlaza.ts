import { Router } from 'express'
import { createTollLocation, updateTollDetails } from '../controller/tollPlaza.ts'

const tollPlazaRoutes = (router: Router) => {
    router.post('/toll', createTollLocation)
    router.put('/toll', updateTollDetails)
}
export default tollPlazaRoutes
