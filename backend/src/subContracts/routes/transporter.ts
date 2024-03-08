import { Router } from 'express'
import {
    listAllTransporter,
    createTransporter,
    listAllTransporterName
} from '../controller/transporter.ts'
import keycloak from '../../keycloak-config.ts'
import { hasRole } from '../../authorization.ts'

const transporterRoutes = (router: Router) => {
    router.get('/transporter', listAllTransporter)
    router.get('/transporter_name', listAllTransporterName)
    router.post('/transporter', keycloak.protect(), hasRole('SuperAdmin'), createTransporter)
}

export default transporterRoutes
