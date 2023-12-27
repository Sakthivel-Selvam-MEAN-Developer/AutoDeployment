import { Router } from 'express'
import { createFuelStation, listAllFuelStationByBunk } from '../controller/fuelStation.ts'

const stationRoutes = (router: Router) => {
    router.post('/station', createFuelStation)
    router.get('/station/:bunkId', listAllFuelStationByBunk)
}

export default stationRoutes
