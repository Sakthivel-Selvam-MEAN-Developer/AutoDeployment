import express from 'express'
import vehicleRoutes from './vehicle.ts'
// import customerRoutes from './customer'
import stopRoutes from './stops.ts'
import reasonRoutes from './reason.ts'
import jobsRoutes from './jobs.ts'
import leaveReasonRoutes from '../../hrm/routes/leaveReasons.ts'
import employeeLeavesRoutes from '../../hrm/routes/employeeLeaves.ts'
// import gpsStopRoutes from './gpsStops'

const router = express.Router()

vehicleRoutes(router)
// customerRoutes(router)
stopRoutes(router)
reasonRoutes(router)
jobsRoutes(router)
// gpsStopRoutes(router)

leaveReasonRoutes(router)
employeeLeavesRoutes(router)

export default router
