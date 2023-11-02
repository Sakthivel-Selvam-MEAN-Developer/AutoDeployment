import { Router } from 'express'
import fetchTraccarData from '../controller/jobs.ts'
import loconavDeviceData from '../controller/loconavJobs.ts'

const jobRoutes = (router: Router) => {
    router.get('/jobs/trigger-traccar-stops', fetchTraccarData)
    router.get('/jobs/trigger-loconav-device', loconavDeviceData)
}

export default jobRoutes
