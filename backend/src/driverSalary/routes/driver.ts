import { Router } from 'express'
import { createDriver, fillterDriverByAttendance, listAllDriver } from '../controller/driver.ts'

const driverRoutes = (router: Router) => {
    router.post('/driver', createDriver)
    router.get('/driver', listAllDriver)
    router.get('/fillterDriver', fillterDriverByAttendance)
}

export default driverRoutes
