import { Router } from 'express'
import { pendingStopReason } from '../controller/pendingReason.ts'
import {
    create,
    getDetails,
    stopDurations,
    updateStopsDb,
    allPendingSRforSingleVehicle,
    overrideStop
} from '../controller/stops.ts'

const stopRoutes = (router: Router) => {
    router.post('/stops', create)
    router.get('/stops/pending/', pendingStopReason)
    router.get('/stops/duration', stopDurations)
    router.get('/stops/:number', getDetails)
    router.post('/stops/update/:id', updateStopsDb)
    router.post('/stops/override', overrideStop)
    router.get('/stops-pending/:number', allPendingSRforSingleVehicle)
}

export default stopRoutes
