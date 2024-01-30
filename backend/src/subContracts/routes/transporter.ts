import { Router } from 'express'
import { listAllTransporter, createTransporter } from '../controller/transporter.ts'

const transporterRoutes = (router: Router) => {
    router.get('/transporter', listAllTransporter)
    router.post('/transporter', createTransporter)
}

export default transporterRoutes
