import { Router } from 'express'
import {
    createTruck,
    listAllTruck,
    listTruckByTransporter,
    listTruckByVehicleNumber
} from '../controller/truck.ts'
import { authorise } from './authorise.ts'

const truckRoutes = (router: Router) => {
    router.get('/truck', listAllTruck)
    router.post('/truck', authorise(['Admin']), createTruck)
    router.get('/transporter-truck/:transporterName', listTruckByTransporter)
    router.get('/truck/transpotertype/:id', listTruckByVehicleNumber)
}
export default truckRoutes
