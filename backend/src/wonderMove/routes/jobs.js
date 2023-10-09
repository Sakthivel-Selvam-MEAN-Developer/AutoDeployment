import fetchTraccarData from '../controller/jobs.js'

const reasonRoutes = (router) => {
    router.get('/jobs/trigger-traccar-stops', fetchTraccarData)
}

export default reasonRoutes
