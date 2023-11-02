import { Router } from 'express'
import fetchTraccarData from '../controller/jobs.ts'
import loconavDeviceData from '../controller/loconavJobs.ts'
import ktTelematicsDeviceData from '../controller/ktTelematicsJobs.ts'

const jobRoutes = (router: Router) => {
    router.get('/jobs/trigger-traccar-stops', fetchTraccarData)
    router.get('/jobs/trigger-loconav-device', loconavDeviceData)
    router.get('/jobs/trigger-kttelematics-device', ktTelematicsDeviceData)
}

export default jobRoutes
