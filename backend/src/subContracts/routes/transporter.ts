import { Router } from 'express'
import {
    listAllTransporter,
    createTransporter,
    listAllTransporterName
} from '../controller/transporter.ts'
import { authorise } from './authorise.ts'

const transporterRoutes = (router: Router) => {
    router.get('/transporter', listAllTransporter)
    router.get('/transporter_name', listAllTransporterName)
    router.post('/transporter', authorise(['Employee']), createTransporter)
}

export default transporterRoutes
