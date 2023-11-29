import { Router } from 'express'
import { listAllTruck, listTruckByTransporter } from '../controller/truck.ts'

const truckRoutes = (router: Router) => {
    router.get('/truck', listAllTruck)
    router.get('/transporter-truck/:transporterName', listTruckByTransporter)
}

export default truckRoutes
