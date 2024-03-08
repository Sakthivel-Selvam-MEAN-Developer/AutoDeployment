import { Router } from 'express'
import { createTruck, listAllTruck, listTruckByTransporter } from '../controller/truck.ts'
import keycloak from '../../keycloak-config.ts'
import { hasRole } from '../../authorization.ts'

const truckRoutes = (router: Router) => {
    router.get('/truck', listAllTruck)
    router.post('/truck', keycloak.protect(), hasRole('SuperAdmin'), createTruck)
    router.get('/transporter-truck/:transporterName', listTruckByTransporter)
}

export default truckRoutes
