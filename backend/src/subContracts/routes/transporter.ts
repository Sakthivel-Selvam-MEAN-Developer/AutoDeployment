import { Router } from 'express'
import {
    listAllTransporter,
    createTransporter,
    listAllTransporterName
} from '../controller/transporter.ts'

const transporterRoutes = (router: Router) => {
    router.get('/transporter', listAllTransporter)
    router.get('/transporter_name', listAllTransporterName)
    router.post('/transporter', createTransporter)
}

export default transporterRoutes
