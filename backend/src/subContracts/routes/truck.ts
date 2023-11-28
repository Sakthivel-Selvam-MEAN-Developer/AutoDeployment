import { Router } from 'express'
import { listAllTruck } from '../controller/truck.ts'

const truckRoutes = (router: Router) => {
    router.get('/truck', listAllTruck)
}

export default truckRoutes
