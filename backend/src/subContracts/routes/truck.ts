import { Router } from 'express'
import { createTruck, listAllTruck, listTruckByTransporter } from '../controller/truck.ts'
import { authorise } from './authorise.ts'

const truckRoutes = (router: Router) => {
    router.get('/truck', listAllTruck)
    router.post('/truck', authorise(['Employee']), createTruck)
    router.get('/transporter-truck/:transporterName', listTruckByTransporter)
}

export default truckRoutes
