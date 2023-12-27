import { Router } from 'express'
import { createFuel, listAllFuel, listFuelWithoutTripId } from '../controller/fuel.ts'

const fuelRoutes = (router: Router) => {
    router.post('/fuel', createFuel)
    router.get('/fuel', listAllFuel)
    router.get('/fuel/:vehiclenumber', listFuelWithoutTripId)
}

export default fuelRoutes
