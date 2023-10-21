import {
    create,
    getDetails,
    stopDurations,
    updateStopsDb,
    pendingStopReason,
    allPendingSRforSingleVehicle,
    overrideStop
} from '../controller/stops.ts'
import {Router} from "express";

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
