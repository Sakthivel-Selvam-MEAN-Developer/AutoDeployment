import { Router } from 'express'
import {
    createFuel,
    listAllFuel,
    listFuelWithoutTripId,
    updateFuelWithTrip,
    listAllFuelList,
    listPreviousFullFuel
} from '../controller/fuel.ts'

const fuelRoutes = (router: Router) => {
    router.post('/fuel/:bunkname', createFuel)
    router.get('/fuel', listAllFuel)
    router.get('/fuel/:vehiclenumber', listFuelWithoutTripId)
    router.put('/fuel-update', updateFuelWithTrip)
    router.get('/getAllFuelReport', listAllFuelList)
    router.get('/previousfuel', listPreviousFullFuel)
}

export default fuelRoutes
