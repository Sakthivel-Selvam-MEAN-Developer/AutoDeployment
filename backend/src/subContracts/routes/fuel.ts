import { Router } from 'express'
import { createFuel, listAllFuel } from '../controller/fuel.ts'

const fuelRoutes = (router: Router) => {
    router.post('/fuel', createFuel)
    router.get('/fuel', listAllFuel)
}

export default fuelRoutes
