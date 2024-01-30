import { Router } from 'express'
import { CreateTruck, listAllTruck, listTruckByTransporter } from '../controller/truck.ts'

const truckRoutes = (router: Router) => {
    router.get('/truck', listAllTruck)
    router.post('/truck', CreateTruck)
    router.get('/transporter-truck/:transporterName', listTruckByTransporter)
}

export default truckRoutes
