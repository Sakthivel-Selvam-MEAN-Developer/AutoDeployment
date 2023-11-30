import { Router } from 'express'
import { listAllTrip } from '../controller/trip'

const tripRoutes = (router: Router) => {
    router.get('/trip', listAllTrip)
    // router.post('/trip', postTrip)
}


export default tripRoutes
