import { Router } from 'express'
import {
    createDriverAttendance,
    getDriverAttendanceDetailsById,
    upsertDriverAttendanceDetailsById
} from '../controller/driverAttendance.ts'

const driverAttendanceRoutes = (router: Router) => {
    router.post('/driver/dailyAttendance', createDriverAttendance)
    router.get('/driver/dailyAttendance', getDriverAttendanceDetailsById)
    router.put('/driver/upsert/bulkAttendance', upsertDriverAttendanceDetailsById)
}

export default driverAttendanceRoutes
