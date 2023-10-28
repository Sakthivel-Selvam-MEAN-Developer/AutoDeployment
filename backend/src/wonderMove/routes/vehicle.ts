import {
    getDetails,
    create,
    listAllNumbers,
    update
} from '../controller/vehicle.ts'
import { Router } from 'express'

const vehicleRoutes = (router: Router) => {
    router.post('/vehicles', create)
    router.get('/vehicles', listAllNumbers)
    router.get('/vehicles/:number', getDetails)
    router.post('/vehicles/:number', update)
}

export default vehicleRoutes
