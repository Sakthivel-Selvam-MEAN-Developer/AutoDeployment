import { Router } from 'express'
import {
    createFuel,
    listAllFuel,
    listFuelWithoutTripId,
    updateFuelWithTrip
} from '../controller/fuel.ts'

const fuelRoutes = (router: Router) => {
    router.post('/fuel', createFuel)
    router.get('/fuel', listAllFuel)
    router.get('/fuel/:vehiclenumber', listFuelWithoutTripId)
    router.put('/fuel-update', updateFuelWithTrip)
}

export default fuelRoutes
