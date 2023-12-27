import express from 'express'
import vehicleRoutes from './wonderMove/routes/vehicle.ts'
import stopRoutes from './wonderMove/routes/stops.ts'
import reasonRoutes from './wonderMove/routes/reason.ts'
import jobsRoutes from './wonderMove/routes/jobs.ts'
import leaveReasonRoutes from './hrm/routes/leaveReasons.ts'
import employeeLeavesRoutes from './hrm/routes/leaves.ts'
import orgHeadRoutes from './hrm/routes/orgHeads.ts'
import orgUnitHeads from './hrm/routes/orgUnits.ts'
import truckRoutes from './subContracts/routes/truck.ts'
import transporterRoutes from './subContracts/routes/transporter.ts'
import tripRoutes from './subContracts/routes/loadingToUnloadingTrip.ts'
import employeeRoutes from './hrm/routes/employees.ts'
import cementCompanyRoutes from './subContracts/routes/cementCompany.ts'
import factoryRoutes from './subContracts/routes/loadingPoint.ts'
import deliveryPointRoutes from './subContracts/routes/unloadingPoint.ts'
import pricePointRoutes from './subContracts/routes/pricePoint.ts'
import paymentDues from './subContracts/routes/paymentDues.ts'
import bunkRoutes from './subContracts/routes/bunk.ts'
import fuelRoutes from './subContracts/routes/fuel.ts'
import stationRoutes from './subContracts/routes/fuelStation.ts'

// import gpsStopRoutes from './gpsStops'

const router = express.Router()

vehicleRoutes(router)
stopRoutes(router)
reasonRoutes(router)
jobsRoutes(router)

leaveReasonRoutes(router)
employeeLeavesRoutes(router)
orgHeadRoutes(router)
orgUnitHeads(router)
employeeRoutes(router)

truckRoutes(router)
transporterRoutes(router)
tripRoutes(router)
factoryRoutes(router)
cementCompanyRoutes(router)
deliveryPointRoutes(router)
pricePointRoutes(router)
paymentDues(router)
bunkRoutes(router)
fuelRoutes(router)
stationRoutes(router)

export default router
