import { Router } from 'express'
import { createDriver, listAllDriver } from '../controller/driver.ts'

const driverRoutes = (router: Router) => {
    router.post('/driver', createDriver)
    router.get('/driver', listAllDriver)
}

export default driverRoutes
