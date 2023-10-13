import { Router } from 'express'
import fetchTraccarData from '../controller/jobs.ts'

const reasonRoutes = (router: Router) => {
    router.get('/jobs/trigger-traccar-stops', fetchTraccarData)
}

export default reasonRoutes
