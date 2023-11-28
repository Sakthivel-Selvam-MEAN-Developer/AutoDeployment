import { Router } from 'express'
import { listAllTransporter } from '../controller/transporter.ts'

const transporterRoutes = (router: Router) => {
    router.get('/transporter', listAllTransporter)
}

export default transporterRoutes
