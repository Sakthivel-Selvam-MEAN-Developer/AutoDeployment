import express from 'express'
import vehicleRoutes from './wonderMove/routes/vehicle.ts'
// import customerRoutes from './customer'
import stopRoutes from './wonderMove/routes/stops.ts'
import reasonRoutes from './wonderMove/routes/reason.ts'
import jobsRoutes from './wonderMove/routes/jobs.ts'
import leaveReasonRoutes from './hrm/routes/leaveReasons.ts'
import employeeLeavesRoutes from './hrm/routes/leaves.ts'
import orgHeadRoutes from './hrm/routes/orgHeads.ts'
import orgUnitHeads from './hrm/routes/orgUnits.ts'
import truckRoutes from './subContracts/routes/truck.ts'
import transporterRoutes from './subContracts/routes/transporter.ts'
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
orgHeadRoutes(router)
orgUnitHeads(router)

truckRoutes(router)
transporterRoutes(router)

export default router
