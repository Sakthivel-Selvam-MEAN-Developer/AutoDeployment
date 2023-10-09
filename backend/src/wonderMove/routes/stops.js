import {
    create,
    getDetails,
    stopDurations,
    updateStopsDb,
    pendingStopReason,
    allPendingSRforSingleVehicle
} from '../controller/stops.js'

const stopRoutes = (router) => {
    router.post('/stops', create)
    router.get('/stops/pending/', pendingStopReason)
    router.get('/stops/duration', stopDurations)
    router.get('/stops/:number', getDetails)
    router.post('/stops/update/:id', updateStopsDb)
    router.get('/pending/:number', allPendingSRforSingleVehicle)
}

export default stopRoutes
